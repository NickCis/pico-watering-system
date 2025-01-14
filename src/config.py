import errno
import ujson as json

config_file = '/config.json'

config = {
    'clock': {
        'sync': True,
        'delta': -3,
    },
    'ap': {
        'enabled': True,
        'ssid': 'Watering System',
        'password': '',
    },
    'wlan': {
        'enabled': False,
        'ssid': '',
        'password': '',
    },
    'server': {
        'enabled': True,
        'port': 80,
    },
}


def _update(data):
    for k, v in config.items():
        for kk in config[k].keys():
            value = data.get(k)
            if type(value) == dict:
                value = value.get(kk)

                if value != None:
                    config[k][kk] = value


def init():
    try:
        with open(config_file) as fd:
            data = json.load(fd)
            _update(data)
    except OSError as e:
        if e.errno != errno.ENOENT:
            print('[config] errno:', errno.errorcode.get(e.errno, e.errno), e)
    except Exception as e:
        print('[config] error:', e)


def update(data):
    _update(data)
    with open(config_file, 'w') as fd:
        json.dump(config, fd)
