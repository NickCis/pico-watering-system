import machine


def read(adcpin=4):
    sensor = machine.ADC(adcpin)
    adc_value = sensor.read_u16()
    volt = (3.3/65535) * adc_value
    temperature = 27 - (volt - 0.706)/0.001721
    return round(temperature, 1)
