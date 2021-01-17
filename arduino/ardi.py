import serial
import csv
import random

ser = serial.Serial('/dev/tty.usbmodem14201')
ser.flushInput()


while True:
    try:
        ser_bytes = ser.readline()
        decoded_bytes = float(ser_bytes[0:len(ser_bytes)-2].decode("utf-8"))
        print(random.randint(0,9),random.randint(0,9), "Jan", 17, 20.0, 61.0, round(random.uniform(0.4, 9.4), 2), 0)
        with open("test_data.csv","a") as f:
            writer = csv.writer(f,delimiter=",")
            writer.writerow([random.randint(0,9),random.randint(0,9), "Jan", 17, 20.0, 61.0, round(random.uniform(0.4, 9.4), 2), 0])
            # writer.writerow([decoded_bytes])
            pass
        pass
    except:
        print("Keyboard Interrupt")
        break