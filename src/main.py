import rp2
import machine
import network
import uasyncio

import wifi
import clock
import config
import server

should_blink = True

# Coroutine: blink on a timer


async def blink(delay_ms):
    global should_blink

    led = machine.Pin('LED', machine.Pin.OUT)
    while True:
        if should_blink:
            led.toggle()
        await uasyncio.sleep_ms(delay_ms)


async def wait_button(get_value):
    '''labmda: btn.get_value()'''
    btn_prev = get_value()
    while (get_value() == 1) or (get_value() == btn_prev):
        btn_prev = get_value()
        await uasyncio.sleep_ms(40)


async def listener():
    global should_blink
    def get_value(): return rp2.bootsel_button()
    while True:
        await wait_button(get_value)
        print('bootsel clicked')
        should_blink = not should_blink


# Coroutine: entry point for asyncio program
async def main():
    config.init()

    # Start coroutine as a task and immediately return
    uasyncio.create_task(blink(500))
    uasyncio.create_task(listener())

    uasyncio.create_task(wifi.coroutine())
    uasyncio.create_task(clock.coroutine())
    uasyncio.create_task(server.coroutine())

    while True:
        await uasyncio.sleep(10000)

# Start event loop and run entry point coroutine
uasyncio.run(main())
