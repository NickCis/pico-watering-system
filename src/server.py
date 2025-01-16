import machine
import ujson as json
import uasyncio

import wifi
import config
import temperature

StatusCodes = {
    '200': 'Ok',
    '307': 'Temporary Redirect',
    '400': 'Bad Request',
    '404': 'Not Found',
    '500': 'Internal Server Error',
}


async def start_response(writer, content_type="text/html; charset=utf-8", status="200", headers=None):
    await writer.awrite(f'HTTP/1.0 {status} {StatusCodes[status]}\r\n')
    await writer.awrite('Content-Type: ')
    await writer.awrite(content_type)

    if headers:
        yield from writer.awrite("\r\n")
        for k, v in headers.items():
            await writer.awrite(k)
            await writer.awrite(": ")
            await writer.awrite(v)
            await writer.awrite("\r\n")
        await writer.awrite("\r\n")
    else:
        await writer.awrite("\r\n\r\n")


async def send_file(writer, file_path, content_type="text/html; charset=utf-8", headers=None, chunk_size=4096):
    await start_response(writer, status='200', content_type=content_type, headers=headers)
    with open(file_path, 'rb') as file:
        while True:
            data = file.read(chunk_size)
            if not data:
                break
            await writer.awrite(data)


async def http_error(writer, status='500'):
    await start_response(writer, status=status)
    await writer.awrite(StatusCodes[status])


async def handler(reader, writer):
    '''Inspired from https://github.com/pfalcon/picoweb/blob/master/picoweb/__init__.py'''

    try:
        request_line = await reader.readline()
        if request_line == b'':
            return

        request_line = request_line.decode()
        method, path, proto = request_line.split()
        path = path.split('?', 1)[0]

        # Will ignore headers
        while True:
            l = await reader.readline()
            if l == b'\r\n':
                break

        print('[server]', method, proto, path)
        handler = Handlers.get(path, handler_404)
        await handler(reader, writer, method, path)
    except Exception as e:
        print('[server] Error while handling a request:', e)
        await http_error(writer, '500')

    finally:
        await writer.aclose()


async def handler_404(reader, writer, method, path):
    await http_error(writer, '404')

# --- Handlers ---


async def handler_home(reader, writer, method, path):
    await send_file(writer, '/index.html.gz', content_type="text/html; charset=utf-8", headers={'Content-Encoding': 'gzip'}),


async def handler_generate_204(reader, writer, method, path):
    ip = wifi.ap.ifconfig()[0] if wifi.ap else '192.168.4.1'
    location = f'http://{ip}'
    await start_response(writer, status='307', headers={'Location': location})
    await writer.awrite(f'<html><head><meta http-equiv="refresh" content="0; url={location}" /></head><body><a href="{location}">Redirect</a></body></html>')


async def handler_api_config(reader, writer, method, path):
    await start_response(writer, status='200', content_type='application/json')
    if method == 'POST':
        body = await reader.aread(4096)
        try:
            j = json.loads(body.decode('utf8'))
            # TODO: store config
        except:
            await http_error(writer, '400')

    else:
        await writer.awrite(json.dumps({
            'config': config.config,
        }))


async def handler_api_wifi(reader, writer, method, path):
    await start_response(writer, status='200', content_type='application/json')
    if method == 'POST':
        body = await reader.aread(4096)
        try:
            j = json.loads(body.decode('utf8'))
            # TODO: store config
        except:
            await http_error(writer, '400')

    else:
        await writer.awrite(json.dumps({
            'ap': wifi.get_state(wifi.ap),
            'wlan': wifi.get_state(wifi.wlan),
        }))


async def handler_api_wifi_scan(reader, writer, method, path):
    await start_response(writer, status='200', content_type='application/json')
    await writer.awrite(json.dumps({
        'networks': wifi.scan(),
    }))


async def handler_api_clock(reader, writer, method, path):
    await start_response(writer, status='200', content_type='application/json')
    if method == 'POST':
        body = await reader.aread(4096)
        try:
            j = json.loads(body.decode('utf8'))
            # TODO: update time
        except:
            await http_error(writer, '400')

    else:
        await writer.awrite(json.dumps({
            'datetime': machine.RTC().datetime(),
        }))


async def handler_api_temperature(reader, writer, method, path):
    await start_response(writer, status='200', content_type='application/json')
    await writer.awrite(json.dumps({
        'temperature': temperature.read(),
    }))

Handlers = {
    '/': handler_home,
    '/gen_204': handler_generate_204,
    '/generate_204': handler_generate_204,
    '/api/config': handler_api_config,
    '/api/wifi': handler_api_wifi,
    '/api/wifi/scan': handler_api_wifi_scan,
    '/api/clock': handler_api_clock,
    '/api/temperature': handler_api_temperature,
}


def coroutine():
    # TODO: disable server
    return uasyncio.start_server(handler, '0.0.0.0', 80)
