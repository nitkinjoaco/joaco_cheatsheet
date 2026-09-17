---
title: Arduino
description: Pines, lecturas, PWM, tiempos y monitor serie en un Arduino UNO.
badge: ino
order: 1
tags: [c++, uno]
updated: 2026-09-16
---

## ¿Qué es?

**Arduino** es una placa con un **microcontrolador** (una computadora mínima en un chip) que se
programa en C++ simplificado. Lee **entradas** (botones, sensores) y controla **salidas** (LEDs,
motores). Los programas se llaman _sketches_ y tienen extensión `.ino`.

## Estructura de un sketch

```cpp
void setup() {
  // Se ejecuta UNA vez al encender o resetear
}

void loop() {
  // Se repite para siempre
}
```

## Pines digitales

Valen `HIGH` (5 V) o `LOW` (0 V).

```cpp
const int LED = 13;
const int BOTON = 2;

void setup() {
  pinMode(LED, OUTPUT);
  pinMode(BOTON, INPUT_PULLUP);  // resistencia interna: suelto = HIGH, apretado = LOW
}

void loop() {
  if (digitalRead(BOTON) == LOW) {
    digitalWrite(LED, HIGH);
  } else {
    digitalWrite(LED, LOW);
  }
}
```

## Pines analógicos

`analogRead()` lee un voltaje de 0 a 5 V y devuelve un número de **0 a 1023**.

```cpp
int valor = analogRead(A0);                 // 0 … 1023
float volts = valor * (5.0 / 1023.0);       // a voltios
int porcentaje = map(valor, 0, 1023, 0, 100);
```

## PWM (salida "analógica")

`analogWrite()` simula un voltaje intermedio prendiendo y apagando muy rápido. Valor de
**0 a 255**. En el UNO solo funciona en los pines con `~`: **3, 5, 6, 9, 10, 11**.

```cpp
analogWrite(9, 127);  // ~50 % de brillo
```

## Tiempo

| Función          | Qué hace                                              |
| ---------------- | ----------------------------------------------------- |
| `delay(ms)`      | Frena **todo** el programa esos milisegundos          |
| `millis()`       | Milisegundos desde que arrancó (`unsigned long`)      |
| `micros()`       | Lo mismo en microsegundos                             |

### Parpadear sin bloquear

Con `millis()` el `loop` sigue corriendo y puede leer sensores mientras tanto.

```cpp
unsigned long anterior = 0;
const unsigned long INTERVALO = 500;

void loop() {
  unsigned long ahora = millis();
  if (ahora - anterior >= INTERVALO) {
    anterior = ahora;
    digitalWrite(LED, !digitalRead(LED));
  }
}
```

## Monitor serie

Sirve para mandar mensajes a la compu y **debuggear**.

```cpp
void setup() {
  Serial.begin(9600);  // tiene que coincidir con el baud rate del monitor
}

void loop() {
  Serial.print("Sensor: ");
  Serial.println(analogRead(A0));
  delay(200);
}
```

> **Tip:** si ves caracteres raros en el monitor serie, revisá que el baud rate sea el mismo en
> el código y en el monitor.

## Tipos de datos (UNO)

| Tipo            | Tamaño  | Rango / uso                     |
| --------------- | ------- | ------------------------------- |
| `bool`          | 1 byte  | `true` / `false`                |
| `byte`          | 1 byte  | 0 … 255                         |
| `int`           | 2 bytes | −32 768 … 32 767                |
| `unsigned long` | 4 bytes | 0 … 4 294 967 295 (para tiempo) |
| `float`         | 4 bytes | Decimales                       |

## Fuentes

- [Referencia oficial de Arduino](https://docs.arduino.cc/language-reference/)
