import serial
import csv
import time

ser = serial.Serial('/dev/tty.usbmodem14201')
ser.flushInput()


while True:
    try:
        ser_bytes = ser.readline()
        decoded_bytes = float(ser_bytes[0:len(ser_bytes)-2].decode("utf-8"))
        print(decoded_bytes)
        with open("test_data.csv","a") as f:
            writer = csv.writer(f,delimiter=",")
            writer.writerow([decoded_bytes])
    except:
        print("Keyboard Interrupt")
        break