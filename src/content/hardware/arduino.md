## ¿Qué es?

**Arduino** es una placa con un **microcontrolador**: una computadora mínima en un solo chip,
sin sistema operativo, que ejecuta **un único programa** para siempre. Lee **entradas**
(botones, sensores) y controla **salidas** (LEDs, motores, pantallas).

- Se programa en **C++** con funciones ya hechas por Arduino (`digitalWrite`, `delay`…).
- Los programas se llaman **sketches** y tienen extensión `.ino`.
- Este machete es para el **Arduino UNO R3** (chip ATmega328P), el más usado para aprender.

| Dato del UNO R3           | Valor                                             |
| ------------------------- | ------------------------------------------------- |
| Voltaje de trabajo        | **5 V**                                           |
| Alimentación              | USB (5 V) o jack / `VIN` con 7–12 V              |
| Memoria del programa (flash) | 32 KB (≈ 0,5 KB los usa el _bootloader_)       |
| Memoria de variables (SRAM) | **2 KB**: muy poca                              |
| EEPROM                    | 1 KB (datos que sobreviven al apagarlo)           |
| Velocidad                 | 16 MHz                                            |

> **Ojo con el UNO R4:** tiene otro chip (32 bits). Casi todo el código funciona igual, pero
> `int` ocupa 4 bytes, cada pin aguanta **mucha menos corriente** y algunas librerías viejas no
> andan. Si tenés un R4, revisá su hoja de datos.

## Cómo cargar un sketch

1. Instalá el **Arduino IDE 2** desde [arduino.cc/en/software](https://www.arduino.cc/en/software).
2. Conectá la placa con un cable USB **de datos** (algunos cables solo cargan).
3. Elegí la placa y el puerto: menú _Tools → Board → Arduino UNO_ y _Tools → Port_ (en Windows
   aparece como `COM3`, `COM4`…; en Linux/Mac como `/dev/ttyACM0` o `/dev/cu.usbmodem…`).
4. **Verificar** (✓): compila y muestra errores, sin subir.
5. **Subir** (→): compila y lo graba en la placa. El LED `L` titila y el programa arranca solo.

- El sketch queda guardado en la placa aunque la desconectes: al volver a darle energía, corre
  de nuevo.
- El archivo `.ino` tiene que estar en una carpeta **con el mismo nombre** (`blink/blink.ino`).
- Muchas placas "compatibles" usan el chip USB **CH340**: si no aparece el puerto, instalá su
  driver.

## Pines del UNO

| Pines                 | Para qué                                                             |
| --------------------- | -------------------------------------------------------------------- |
| `0` y `1`             | Comunicación serie con la compu (RX/TX). **Evitá usarlos.**          |
| `2` a `13`            | Entradas/salidas digitales                                           |
| `3, 5, 6, 9, 10, 11`  | PWM (`analogWrite`), marcados con `~`                                |
| `2` y `3`             | Interrupciones externas                                              |
| `13`                  | Tiene el LED `L` de la placa conectado                               |
| `A0` a `A5`           | Entradas analógicas (también sirven como digitales)                  |
| `A4` / `A5`           | I2C (SDA / SCL)                                                      |
| `10, 11, 12, 13`      | SPI                                                                  |
| `5V`, `3.3V`          | Salidas de alimentación para sensores (3.3V: máx. 50 mA)             |
| `GND`                 | Tierra (0 V). Todos los GND están conectados entre sí                |
| `VIN`                 | Entrada de 7–12 V (o la tensión del jack)                            |

### Límites de corriente

- **20 mA por pin** es lo recomendado; **40 mA** es el máximo absoluto (se puede quemar).
- Alrededor de **200 mA sumando todos** los pines.
- Un pin **no puede** alimentar motores, relés ni tiras de LEDs: usá un transistor, un driver
  (L298N, ULN2003) o un módulo con su propia fuente.

## Electrónica mínima

### Ley de Ohm

```text
V = I × R        voltaje (V) = corriente (A) × resistencia (Ω)
```

### Resistencia para un LED

Un LED **siempre** va con una resistencia en serie; si no, pide toda la corriente que puede y
se quema (él o el pin).

```text
R = (V_fuente − V_led) / I

LED rojo:  R = (5 V − 2 V) / 0,015 A = 200 Ω   → usá 220 Ω (valor comercial)
LED azul o blanco (≈ 3 V): (5 − 3) / 0,015 = 133 Ω → usá 150 Ω o 220 Ω
```

- La pata **larga** del LED es el ánodo (+), va al pin. La corta, a GND.
- 220 Ω a 330 Ω funciona bien para casi cualquier LED en 5 V.

### Protoboard

```text
 + ─────────────────────────   ← filas de alimentación: conectadas a lo LARGO
 − ─────────────────────────
   a b c d e   f g h i j
 1 ● ● ● ● ●   ● ● ● ● ●      ← cada fila de 5 está conectada a lo ANCHO
 2 ● ● ● ● ●   ● ● ● ● ●         la canaleta del medio separa los dos lados
```

> **Regla:** todos los circuitos que se comunican tienen que compartir **GND**. Si usás una
> fuente externa, uní su GND con el del Arduino.

### Código de colores de resistencias (4 bandas)

| Color    | Dígito | Color    | Dígito |
| -------- | ------ | -------- | ------ |
| Negro    | 0      | Verde    | 5      |
| Marrón   | 1      | Azul     | 6      |
| Rojo     | 2      | Violeta  | 7      |
| Naranja  | 3      | Gris     | 8      |
| Amarillo | 4      | Blanco   | 9      |

Banda 1 y 2 = dígitos, banda 3 = cantidad de ceros, banda 4 = tolerancia (dorado 5 %).
Ejemplo: **rojo-rojo-marrón** = 22 + un cero = **220 Ω**.

## Estructura de un sketch

```cpp
// 1. Arriba: librerías, constantes y variables globales
const int LED = LED_BUILTIN;  // 13

// 2. setup(): corre UNA vez al encender o apretar reset
void setup() {
  pinMode(LED, OUTPUT);
  Serial.begin(9600);
}

// 3. loop(): se repite para siempre, miles de veces por segundo
void loop() {
  digitalWrite(LED, HIGH);
  delay(500);
  digitalWrite(LED, LOW);
  delay(500);
}
```

## C++ para Arduino

### Variables y constantes

```cpp
int contador = 0;               // global: la ven todas las funciones y conserva su valor
const int PIN_BOTON = 2;        // constante: no se puede cambiar (preferí esto)
#define PIN_LED 13              // reemplazo de texto, sin tipo ni ; (ver "El preprocesador")

void loop() {
  int lectura = analogRead(A0); // local: se crea y se borra en cada vuelta del loop
  static int vueltas = 0;       // local, pero conserva su valor entre vueltas
  vueltas++;
}
```

### Condicionales y bucles

```cpp
if (temperatura > 30) {
  digitalWrite(VENTILADOR, HIGH);
} else if (temperatura > 25) {
  analogWrite(VENTILADOR, 128);
} else {
  digitalWrite(VENTILADOR, LOW);
}

switch (modo) {               // solo con enteros o char
  case 0:
    apagar();
    break;                    // sin break, sigue con el case siguiente
  case 1:
    prender();
    break;
  default:
    Serial.println("Modo desconocido");
}

for (int i = 0; i < 5; i++) {  // repite 5 veces: i = 0, 1, 2, 3, 4
  digitalWrite(LED, HIGH);
  delay(100);
  digitalWrite(LED, LOW);
  delay(100);
}

while (digitalRead(BOTON) == HIGH) {
  // espera hasta que se apriete (¡bloquea el programa!)
}
```

| Operador            | Significa                               |
| ------------------- | --------------------------------------- |
| `==`, `!=`          | Igual, distinto (`=` asigna, **no compara**) |
| `<`, `>`, `<=`, `>=` | Comparaciones                          |
| `&&`, `\|\|`, `!`   | Y, o, no                                |
| `%`                 | Resto de la división (`7 % 3` = 1)      |
| `++`, `--`, `+=`    | Sumar 1, restar 1, sumar y asignar      |

### Funciones propias

```cpp
// tipo_que_devuelve nombre(parámetros)
float leerVoltaje(int pin) {
  int valor = analogRead(pin);
  return valor * (5.0 / 1023.0);
}

void titilar(int pin, int veces) {  // void = no devuelve nada
  for (int i = 0; i < veces; i++) {
    digitalWrite(pin, HIGH);
    delay(150);
    digitalWrite(pin, LOW);
    delay(150);
  }
}

void loop() {
  float v = leerVoltaje(A0);
  if (v > 2.5) titilar(LED, 3);
}
```

### Arrays

```cpp
const int LEDS[] = {3, 5, 6, 9};    // lista de pines
const int CANTIDAD = 4;             // o: sizeof(LEDS) / sizeof(LEDS[0])

void setup() {
  for (int i = 0; i < CANTIDAD; i++) {
    pinMode(LEDS[i], OUTPUT);        // los índices van de 0 a CANTIDAD - 1
  }
}
```

> **Ojo:** C++ **no** avisa si te pasás del array (`LEDS[4]`): lee memoria basura y el programa
> hace cosas raras.

### Textos: `String` vs `char[]`

```cpp
String nombre = "Ana";                   // cómodo: se puede concatenar
String saludo = "Hola " + nombre;
Serial.println(saludo.length());

char texto[] = "Hola";                     // array de caracteres (más liviano)

Serial.println(F("Texto largo fijo"));     // F() guarda el texto en la flash, no en la SRAM
```

Con solo 2 KB de SRAM, usar muchos `String` que cambian todo el tiempo puede fragmentar la
memoria y colgar la placa después de un rato. Para textos fijos, usá `F("…")`.

## El preprocesador: `#define` e `#include`

Antes de compilar, un programa llamado **preprocesador** lee las líneas que empiezan con `#` y
**modifica el texto** del sketch: pega archivos (`#include`), reemplaza nombres (`#define`) o
borra partes (`#if`). Recién después el compilador ve el código resultante.

- Las líneas con `#` **no** llevan `;` al final.
- No son variables: no ocupan memoria ni tienen tipo. Son **buscar y reemplazar**.

### `#define` para constantes

```cpp
#define PIN_LED 13
#define INTERVALO_MS 500UL      // UL: que sea unsigned long
#define NOMBRE "Estación 1"

void setup() {
  pinMode(PIN_LED, OUTPUT);     // el compilador ve: pinMode(13, OUTPUT);
}
```

Convención: nombres en **MAYÚSCULAS** para que se note que son defines.

### Macros con parámetros

Un `#define` también puede recibir parámetros, como una función que se "pega" en el lugar:

```cpp
#define CUADRADO(x) ((x) * (x))
#define A_VOLTS(lectura) ((lectura) * 5.0 / 1023.0)

float v = A_VOLTS(analogRead(A0));
```

Las **trampas**, porque es reemplazo de texto:

```cpp
#define DOBLE_MAL(x) x * 2
DOBLE_MAL(3 + 1);        // ❌ se convierte en 3 + 1 * 2 = 5, no 8

#define DOBLE(x) ((x) * 2)
DOBLE(3 + 1);            // ✅ ((3 + 1) * 2) = 8: paréntesis en cada x y en todo

CUADRADO(i++);           // ❌ se convierte en ((i++) * (i++)): suma 2 veces
```

> **Tip:** en C++ casi siempre es mejor una **función** común que una macro: tiene tipos, no
> tiene estas trampas y el compilador la optimiza igual.

### Defines que ya trae Arduino

Muchas "palabras" de Arduino son defines del archivo `Arduino.h`:

| Nombre                  | Definido como                           |
| ----------------------- | --------------------------------------- |
| `HIGH` / `LOW`          | `1` / `0`                               |
| `INPUT` / `OUTPUT` / `INPUT_PULLUP` | `0` / `1` / `2`             |
| `LED_BUILTIN`           | `13` (en el UNO)                        |
| `PI`                    | `3.14159265…`                           |
| `min(a, b)`, `max(a, b)` | Macros: `((a)<(b)?(a):(b))`…           |
| `abs(x)`, `sq(x)`, `constrain(x, a, b)`, `round(x)` | Macros       |

Por eso `min(contador++, 10)` es peligroso: `contador++` se puede ejecutar **dos veces**.
Hacé el `++` en otra línea. (`map()`, en cambio, es una función normal.)

### Compilación condicional: modo debug

Con `#if` podés dejar los `Serial.print` de prueba en el código y **apagarlos todos** cambiando
un solo número. Cuando están apagados, el preprocesador los borra: no ocupan memoria ni tiempo.

```cpp
#define DEBUG 1   // 1 = mostrar mensajes, 0 = sacarlos

#if DEBUG
  #define DEBUG_BEGIN(baud) Serial.begin(baud)
  #define DEBUG_PRINT(x)    Serial.print(x)
  #define DEBUG_PRINTLN(x)  Serial.println(x)
#else
  #define DEBUG_BEGIN(baud)
  #define DEBUG_PRINT(x)
  #define DEBUG_PRINTLN(x)
#endif

void setup() {
  DEBUG_BEGIN(115200);
  DEBUG_PRINTLN(F("Arrancando"));
}

void loop() {
  int valor = analogRead(A0);
  DEBUG_PRINT(F("A0 = "));
  DEBUG_PRINTLN(valor);
}
```

| Directiva                     | Qué hace                                            |
| ----------------------------- | --------------------------------------------------- |
| `#define NOMBRE valor`        | Define un reemplazo                                 |
| `#undef NOMBRE`               | Lo borra                                            |
| `#if CONDICION` … `#endif`    | Incluye el código solo si la condición es verdadera |
| `#ifdef NOMBRE`               | … si `NOMBRE` está definido (con cualquier valor)   |
| `#ifndef NOMBRE`              | … si **no** está definido                           |
| `#elif` / `#else`             | Otras ramas                                         |
| `#error "mensaje"`            | Frena la compilación con ese mensaje                |

El IDE define un nombre según la placa elegida, así que se puede escribir código para varias:

```cpp
#if defined(ARDUINO_AVR_UNO)
  const int PIN_SENSOR = A0;
#elif defined(ESP32)
  const int PIN_SENSOR = 34;
#else
  #error "Placa no soportada"
#endif
```

### `#include`

```cpp
#include <Servo.h>        // < >: busca en las librerías instaladas
#include "config.h"       // " ": busca primero en la carpeta del sketch
```

Para ordenar un sketch largo, creá una pestaña nueva con el botón `⋯` del IDE (por ejemplo
`config.h`) y poné ahí los pines y ajustes:

```cpp
// config.h
#pragma once              // evita que se incluya dos veces

#define DEBUG 1
const int PIN_LED = 13;
const unsigned long INTERVALO_MS = 500;
```

### ¿`#define`, `const` o `constexpr`?

|                                   | `#define`                     | `const int` / `constexpr int`   |
| --------------------------------- | ----------------------------- | ------------------------------- |
| Tiene tipo                        | No                            | Sí                              |
| Respeta las llaves `{}` (alcance) | No: vale en todo lo que sigue | Sí                              |
| Errores del compilador            | Confusos                      | Claros                          |
| Gasta SRAM en el UNO              | No                            | No (el compilador lo reemplaza) |
| Sirve para `#if`                  | Sí                            | No                              |

Regla práctica: **`const` (o `constexpr`) para valores** como pines e intervalos;
**`#define` para lo que solo el preprocesador puede hacer**: `#if` / `#ifdef`, macros de debug y
evitar inclusiones dobles.

## Salidas digitales

```cpp
pinMode(pin, OUTPUT);
digitalWrite(pin, HIGH);   // 5 V
digitalWrite(pin, LOW);    // 0 V
digitalWrite(pin, !digitalRead(pin));   // invierte el estado
```

## Entradas digitales

```cpp
pinMode(pin, INPUT);           // entrada común (necesita resistencia externa)
pinMode(pin, INPUT_PULLUP);    // entrada con resistencia interna a 5 V
int estado = digitalRead(pin); // HIGH o LOW
```

### ¿Por qué hace falta pull-up o pull-down?

Un pin de entrada sin nada conectado **flota**: lee `HIGH` y `LOW` al azar (hasta acercando la
mano). Hay que "atarlo" a un valor conocido con una resistencia.

| Conexión                     | Suelto  | Apretado | Cómo se arma                                    |
| ---------------------------- | ------- | -------- | ----------------------------------------------- |
| `INPUT` + **pull-down** 10 kΩ | `LOW`  | `HIGH`   | Botón entre **5 V** y el pin; 10 kΩ entre el pin y **GND** |
| `INPUT_PULLUP` ⭐            | `HIGH`  | `LOW`    | Botón entre el pin y **GND**. Nada más          |

```cpp
const int BOTON = 2;
const int LED = 13;

void setup() {
  pinMode(BOTON, INPUT_PULLUP);
  pinMode(LED, OUTPUT);
}

void loop() {
  bool apretado = digitalRead(BOTON) == LOW;  // con pull-up, apretado es LOW
  digitalWrite(LED, apretado ? HIGH : LOW);
}
```

### Detectar el momento en que se aprieta (con antirrebote)

Un botón mecánico "rebota": al apretarlo, cambia varias veces en pocos milisegundos. Si contás
pulsaciones sin filtrar, se cuentan de más.

```cpp
const int BOTON = 2;
bool estadoAnterior = HIGH;
unsigned long ultimoCambio = 0;
int pulsaciones = 0;

void setup() {
  pinMode(BOTON, INPUT_PULLUP);
  Serial.begin(9600);
}

void loop() {
  bool estado = digitalRead(BOTON);
  if (estado != estadoAnterior && millis() - ultimoCambio > 50) {
    ultimoCambio = millis();
    if (estado == LOW) {               // pasó de suelto a apretado
      pulsaciones++;
      Serial.println(pulsaciones);
    }
    estadoAnterior = estado;
  }
}
```

## Entradas analógicas

`analogRead()` mide un voltaje entre **0 y 5 V** y devuelve un número de **0 a 1023** (10 bits).

```cpp
int valor = analogRead(A0);                     // 0 … 1023
float volts = valor * (5.0 / 1023.0);           // a voltios
int porcentaje = map(valor, 0, 1023, 0, 100);   // a otra escala
```

### Potenciómetro

```text
pata izquierda → 5V     pata del medio → A0     pata derecha → GND
```

### `map()` y `constrain()`

```cpp
int brillo = map(valor, 0, 1023, 0, 255);   // regla de tres
brillo = constrain(brillo, 0, 255);         // lo limita al rango
```

`map()` trabaja con **enteros** (descarta decimales) y **no limita**: si el valor se sale del
rango de entrada, el resultado también se sale. Por eso se combina con `constrain()`.

> **Ojo:** nunca conectes más de 5 V a un pin (ni voltaje negativo). Para medir más, usá un
> divisor de tensión.

## PWM: salida "analógica"

El Arduino no puede sacar 2,5 V de verdad. `analogWrite()` prende y apaga el pin muy rápido
(≈ 490 Hz) y cambia **qué porcentaje del tiempo** está prendido.

```cpp
analogWrite(9, 0);     // siempre apagado (0 %)
analogWrite(9, 64);    // 25 %
analogWrite(9, 127);   // 50 %: un LED se ve a medio brillo
analogWrite(9, 255);   // siempre prendido (100 %)
```

- Valores de **0 a 255**. Solo en los pines `~`: **3, 5, 6, 9, 10, 11**.
- No hace falta `pinMode(pin, OUTPUT)`, pero no molesta.

### Fundido (_fade_)

```cpp
for (int b = 0; b <= 255; b++) {
  analogWrite(9, b);
  delay(5);
}
```

## Tiempo

| Función          | Qué hace                                                           |
| ---------------- | ------------------------------------------------------------------ |
| `delay(ms)`      | Frena **todo** el programa esos milisegundos                       |
| `delayMicroseconds(us)` | Pausa corta en microsegundos                                |
| `millis()`       | Milisegundos desde que arrancó (`unsigned long`, vuelve a 0 a los ~49 días) |
| `micros()`       | Lo mismo en microsegundos (vuelve a 0 a los ~70 minutos)           |

### El problema de `delay()`

Durante un `delay(1000)` el Arduino **no hace nada más**: no lee botones, no actualiza sensores.
Con un solo LED no importa; con dos cosas a la vez, sí.

### Hacer varias cosas "a la vez" con `millis()`

```cpp
const int LED_A = 12;
const int LED_B = 13;
unsigned long anteriorA = 0;
unsigned long anteriorB = 0;

void setup() {
  pinMode(LED_A, OUTPUT);
  pinMode(LED_B, OUTPUT);
}

void loop() {
  unsigned long ahora = millis();

  if (ahora - anteriorA >= 300) {   // cada 300 ms
    anteriorA = ahora;
    digitalWrite(LED_A, !digitalRead(LED_A));
  }

  if (ahora - anteriorB >= 1000) {  // cada 1 s
    anteriorB = ahora;
    digitalWrite(LED_B, !digitalRead(LED_B));
  }

  // acá se pueden leer botones sin demora
}
```

La idea: en vez de **esperar**, en cada vuelta del `loop` preguntás "¿ya pasó el tiempo?". Las
variables de tiempo **siempre** `unsigned long`, y escribilo como `ahora - anterior >= intervalo`:
así sigue funcionando cuando `millis()` vuelve a 0.

## Puerto serie (`Serial`)

El **puerto serie** es la forma en que el Arduino **manda y recibe texto o bytes** por un cable,
**un bit atrás del otro**. Sirve para:

- **Debuggear**: ver valores de variables en la compu.
- **Recibir órdenes** desde la compu (encender un LED escribiendo un comando).
- **Hablar con otros aparatos**: otro Arduino, un módulo Bluetooth HC-05, un GPS, un ESP8266.

### Cómo funciona

El UNO tiene **un** puerto serie por hardware (UART), en los pines **0 (RX)** y **1 (TX)**. Esos
mismos pines están conectados a un chip que lo convierte a **USB**: por eso el monitor serie de
la compu y los pines 0/1 son **el mismo puerto**.

```text
   Arduino                          Otro dispositivo
  ┌─────────┐                       ┌─────────┐
  │   TX (1)├──────────────────────►│RX       │   TX (transmite) va a RX (recibe):
  │   RX (0)│◄──────────────────────┤TX       │   los cables se CRUZAN
  │     GND ├───────────────────────┤GND      │   y siempre GND común
  └─────────┘                       └─────────┘
```

| Concepto        | Qué es                                                                   |
| --------------- | ------------------------------------------------------------------------ |
| **TX / RX**     | Pin que transmite / pin que recibe                                       |
| **Baud rate**   | Velocidad en bits por segundo. **Los dos lados tienen que usar la misma** |
| **8N1**         | Formato de cada carácter: 8 bits de datos, sin paridad, 1 bit de parada (el que usa Arduino por defecto) |
| **Buffer**      | "Sala de espera" de 64 bytes donde se guarda lo que llega hasta que lo leés |
| **Asíncrono**   | No hay cable de reloj: por eso los dos lados tienen que acordar la velocidad |

Cada carácter viaja como **10 bits** (1 de inicio + 8 de datos + 1 de parada):

| Baud rate | Caracteres por segundo (aprox.) | Uso típico                                  |
| --------- | ------------------------------- | ------------------------------------------- |
| `9600`    | 960                             | El clásico: módulos Bluetooth, GPS, ejemplos |
| `57600`   | 5 760                           |                                             |
| `115200`  | 11 520                          | ⭐ Debuggear mucho texto sin frenar el programa |

> **Ojo:** mientras uses el USB, **no conectes nada a los pines 0 y 1**: interfiere con el
> monitor serie y con la subida del sketch.

### Monitor serie

Se abre con el ícono de lupa (arriba a la derecha) o <kbd>Ctrl</kbd> + <kbd>Shift</kbd> +
<kbd>M</kbd>. Tiene dos opciones importantes:

| Opción             | Qué elegir                                                             |
| ------------------ | ---------------------------------------------------------------------- |
| **Baud rate**      | El mismo número que pusiste en `Serial.begin()`                        |
| **Final de línea** | Qué se agrega al apretar Enter: _No Line Ending_, _New Line_ (`\n`), _Carriage Return_ (`\r`) o _Both NL & CR_ (`\r\n`) |

- Abrir el monitor serie **reinicia** el UNO: el sketch arranca de cero.
- Solo **un programa a la vez** puede usar el puerto. Si el monitor está abierto en otra ventana
  (o un script de Python lo usa), no vas a poder subir el sketch.

### Escribir

```cpp
void setup() {
  Serial.begin(115200);          // velocidad (baud rate): igual en el monitor
  Serial.println(F("Arrancó"));  // F(): el texto fijo queda en la flash, no gasta SRAM
}

void loop() {
  int valor = analogRead(A0);
  Serial.print("Sensor: ");      // sin salto de línea
  Serial.println(valor);         // con salto de línea (\r\n)
  delay(200);
}
```

| Código                         | Se ve en el monitor | Por qué                                  |
| ------------------------------ | ------------------- | ---------------------------------------- |
| `Serial.print(65)`             | `65`                | `print` convierte el número a texto      |
| `Serial.write(65)`             | `A`                 | `write` manda el **byte** 65, que es la `A` en ASCII |
| `Serial.print('A')`            | `A`                 | Un `char`                                |
| `Serial.print(65, HEX)`        | `41`                | Hexadecimal (también `BIN`, `OCT`, `DEC`) |
| `Serial.print(3.14159)`        | `3.14`              | Los `float` salen con 2 decimales por defecto |
| `Serial.print(3.14159, 4)`     | `3.1416`            | Con 4 decimales                          |
| `Serial.print('\t')`           | (tabulación)        | Útil para alinear columnas               |

`print` es para **personas** (texto); `write` es para **máquinas** (bytes crudos).

#### Armar un texto con varios valores

```cpp
char linea[40];
snprintf(linea, sizeof(linea), "t=%lu ms, sensor=%d", millis(), analogRead(A0));
Serial.println(linea);

// ⚠️ En el UNO, %f NO funciona (imprime "?"). Para decimales, dtostrf:
char numero[10];
dtostrf(23.456, 0, 2, numero);   // valor, ancho mínimo, decimales, destino → "23.46"
Serial.println(numero);
```

| Formato | Tipo                          |
| ------- | ----------------------------- |
| `%d`    | `int`                         |
| `%ld`   | `long`                        |
| `%lu`   | `unsigned long` (`millis()`)  |
| `%s`    | texto (`char[]`)              |
| `%c`    | un carácter                   |
| `%x`    | hexadecimal                   |

#### `Serial.print` puede frenar el programa

Lo que imprimís va a un buffer de salida de 64 bytes que se vacía a la velocidad del baud rate.
Si imprimís más rápido de lo que sale (mucho texto a 9600), `print` **espera** y tu `loop` se
vuelve lento. Soluciones: subir a `115200`, imprimir menos seguido (con `millis()`) o mandar
menos texto.

### Leer

```cpp
void loop() {
  if (Serial.available() > 0) {   // ¿hay bytes esperando en el buffer?
    char c = Serial.read();       // saca UN byte (-1 si no había nada)
    if (c == 'p') digitalWrite(LED_BUILTIN, HIGH);
    if (c == 'a') digitalWrite(LED_BUILTIN, LOW);
  }
}
```

| Función                            | Qué hace                                                      | ¿Espera? |
| ---------------------------------- | ------------------------------------------------------------- | -------- |
| `Serial.available()`               | Cantidad de bytes que llegaron y todavía no leíste            | No       |
| `Serial.read()`                    | Saca un byte del buffer                                       | No       |
| `Serial.peek()`                    | Mira el próximo byte **sin sacarlo**                          | No       |
| `Serial.parseInt()`                | Lee un número entero; si no llega nada, devuelve `0`          | Sí (hasta 1 s) |
| `Serial.parseFloat()`              | Lo mismo con decimales                                        | Sí       |
| `Serial.readStringUntil('\n')`     | Lee hasta el carácter indicado (sin incluirlo) → `String`     | Sí       |
| `Serial.readBytesUntil('\n', buf, largo)` | Lo mismo, a un `char[]`                                | Sí       |
| `Serial.setTimeout(ms)`            | Cambia cuánto esperan las funciones de arriba (por defecto 1000 ms) | —  |
| `Serial.flush()`                   | Espera a que termine de **salir** lo impreso (no borra lo recibido) | Sí |

> **Tip:** las funciones que "esperan" frenan el `loop` hasta que llega el dato o pasa el
> _timeout_. Si el programa tiene que seguir haciendo otras cosas, usá la lectura carácter por
> carácter de abajo.

#### Recibir comandos sin bloquear

Junta los caracteres en un array hasta que llega el Enter (`\n`) y recién ahí procesa la línea.
Poné el monitor en _New Line_ o _Both NL & CR_.

```cpp
const byte MAX_LARGO = 32;
char buffer[MAX_LARGO];
byte posicion = 0;

void setup() {
  Serial.begin(115200);
  pinMode(LED_BUILTIN, OUTPUT);
  Serial.println(F("Comandos: LED ON | LED OFF | PWM 0-255"));
}

void loop() {
  while (Serial.available() > 0) {
    char c = Serial.read();
    if (c == '\r') continue;               // ignora el \r de "Both NL & CR"
    if (c == '\n') {                       // llegó el Enter: la línea está completa
      buffer[posicion] = '\0';             // marca el final del texto
      procesarComando(buffer);
      posicion = 0;                        // listo para la próxima línea
    } else if (posicion < MAX_LARGO - 1) { // no se pasa del array
      buffer[posicion++] = c;
    }
  }
  // acá el loop sigue libre para leer sensores, botones, etc.
}

void procesarComando(const char* cmd) {
  if (strcmp(cmd, "LED ON") == 0) {        // strcmp devuelve 0 si son iguales
    digitalWrite(LED_BUILTIN, HIGH);
    Serial.println(F("OK"));
  } else if (strcmp(cmd, "LED OFF") == 0) {
    digitalWrite(LED_BUILTIN, LOW);
    Serial.println(F("OK"));
  } else if (strncmp(cmd, "PWM ", 4) == 0) { // empieza con "PWM "
    int valor = constrain(atoi(cmd + 4), 0, 255);   // atoi: texto → número
    analogWrite(9, valor);
    Serial.print(F("PWM = "));
    Serial.println(valor);
  } else {
    Serial.print(F("Comando desconocido: "));
    Serial.println(cmd);
  }
}
```

#### Recibir varios números separados por comas

```cpp
// Desde el monitor mandás: 255,120,0   (con New Line)
void loop() {
  if (Serial.available() > 0) {
    int rojo = Serial.parseInt();     // parseInt saltea lo que no es número (las comas)
    int verde = Serial.parseInt();
    int azul = Serial.parseInt();
    if (Serial.read() == '\n') {      // la línea terminó bien
      analogWrite(9, rojo);
      analogWrite(10, verde);
      analogWrite(11, azul);
    }
  }
}
```

#### Mandar datos para que los lea otro programa

Para que una planilla, Python o el Serial Plotter lo puedan leer fácil, mandá **una línea por
medición** con los valores separados por comas (formato CSV):

```cpp
Serial.print(millis());
Serial.print(',');
Serial.print(analogRead(A0));
Serial.print(',');
Serial.println(analogRead(A1));   // → 15230,512,301
```

### Serial Plotter

_Tools → Serial Plotter_ dibuja un gráfico en vivo con los números que mandes. Cada línea es un
momento; con etiquetas `nombre:valor` separadas por comas dibuja varias curvas:

```cpp
Serial.print("luz:");
Serial.print(analogRead(A0));
Serial.print(",temp:");
Serial.println(analogRead(A1));
```

El Plotter y el Monitor serie no pueden estar abiertos a la vez.

### Leer el puerto desde la compu (Python)

Cualquier programa puede hablar con el Arduino por el puerto serie. Ejemplo con Python
(`pip install pyserial`), usando el sketch de comandos de arriba:

```python
import time
import serial   # paquete pyserial

arduino = serial.Serial("COM3", 115200, timeout=1)   # en Linux/Mac: "/dev/ttyACM0"
time.sleep(2)                     # abrir el puerto reinicia el UNO: esperá que arranque
arduino.reset_input_buffer()      # descarta el mensaje de bienvenida

arduino.write(b"LED ON\n")        # b"..." = bytes
respuesta = arduino.readline().decode().strip()
print(respuesta)                  # OK

arduino.close()
```

Cerrá el monitor serie del IDE antes de correrlo: el puerto no se puede compartir. Desde Node.js
se usa el paquete `serialport`, y en Chrome/Edge existe la **Web Serial API**.

### Más puertos serie: `SoftwareSerial`

El UNO tiene un solo puerto serie por hardware, y ya lo usa el USB. Para conectar un módulo
serie y **a la vez** seguir viendo el monitor, `SoftwareSerial` crea un puerto extra en otros
pines (viene incluida con el IDE).

```cpp
#include <SoftwareSerial.h>

SoftwareSerial bluetooth(10, 11);   // (RX, TX) del ARDUINO

void setup() {
  Serial.begin(9600);      // monitor serie (USB)
  bluetooth.begin(9600);   // velocidad del módulo (el HC-05 viene en 9600)
  Serial.println(F("Puente listo"));
}

void loop() {
  // Todo lo que llega del módulo se muestra en el monitor, y al revés
  if (bluetooth.available()) Serial.write(bluetooth.read());
  if (Serial.available()) bluetooth.write(Serial.read());
}
```

| Pin del módulo HC-05 | Va a…                                                              |
| -------------------- | ------------------------------------------------------------------ |
| `TXD`                | Pin **10** (RX del Arduino)                                        |
| `RXD`                | Pin **11** (TX del Arduino) **con divisor de tensión** (1 kΩ + 2 kΩ): el módulo recibe 3,3 V |
| `VCC`                | `5V`                                                               |
| `GND`                | `GND`                                                              |

Limitaciones de `SoftwareSerial`:

- Hasta **57600** baudios funciona bien; más rápido pierde datos. Lo más seguro: 9600.
- Si creás varios, **solo uno escucha a la vez** (se cambia con `puerto.listen()`).
- Mientras transmite, desactiva las interrupciones: puede afectar a `Servo` o a mediciones de
  tiempo muy precisas.

### Conectar dos Arduinos

```text
Arduino A            Arduino B
 pin 11 (TX) ──────► pin 10 (RX)
 pin 10 (RX) ◄────── pin 11 (TX)
 GND ─────────────── GND
```

Los dos con `SoftwareSerial puerto(10, 11);` y el **mismo** baud rate. Uno manda con
`puerto.println(valor)` y el otro lee con la técnica de comandos de arriba.

> **Ojo con los voltajes:** el UNO trabaja con **5 V**. Muchos módulos (ESP8266, ESP32, algunos
> GPS) usan **3,3 V** y se pueden dañar si les llega 5 V a su RX. Usá un divisor de tensión o un
> _level shifter_.

## Funciones útiles

| Función                           | Qué hace                                              |
| --------------------------------- | ----------------------------------------------------- |
| `map(v, deMin, deMax, aMin, aMax)` | Cambia de escala (enteros)                           |
| `constrain(v, min, max)`          | Limita un valor a un rango                            |
| `min(a, b)`, `max(a, b)`, `abs(v)` | Mínimo, máximo, valor absoluto                       |
| `random(min, max)`                | Número al azar entre `min` y `max - 1`                |
| `randomSeed(analogRead(A5))`      | En `setup`: semilla con ruido de un pin **sin conectar** |
| `tone(pin, frecuencia)`           | Suena un buzzer pasivo (`tone(8, 440)` = nota La)     |
| `tone(pin, frec, duracionMs)`     | Suena un rato                                         |
| `noTone(pin)`                     | Lo apaga                                              |
| `pulseIn(pin, HIGH)`              | Mide cuánto dura un pulso (sensor ultrasónico HC-SR04) |

## Librerías

Código listo para usar sensores, pantallas y motores.

1. _Sketch → Include Library → Manage Libraries…_ (o el ícono de libros de la izquierda).
2. Buscá e instalá la librería.
3. Incluila arriba del sketch con `#include`.

### Ejemplo: servomotor

```cpp
#include <Servo.h>

Servo servo;

void setup() {
  servo.attach(9);       // cable de señal (naranja/amarillo) al pin 9
}

void loop() {
  int angulo = map(analogRead(A0), 0, 1023, 0, 180);
  servo.write(angulo);   // 0 a 180 grados
  delay(15);
}
```

Un micro servo SG90 se puede alimentar del `5V` del Arduino; servos más grandes necesitan fuente
propia (con GND común).

### Guardar datos que sobreviven al apagado: EEPROM

```cpp
#include <EEPROM.h>

int record = 0;

EEPROM.get(0, record);   // en setup(): lee lo guardado en la dirección 0
EEPROM.put(0, record);   // guarda (cualquier tipo); put solo escribe si el valor cambió
```

Cada celda aguanta unas **100 000 escrituras**: no escribas en cada vuelta del `loop`.

## Interrupciones

Hacen que una función se ejecute **en el instante** en que cambia un pin, aunque el `loop` esté
ocupado. En el UNO: pines **2 y 3**.

```cpp
const int SENSOR = 2;
volatile unsigned long cuentas = 0;   // volatile: la cambia la interrupción

void contar() {                       // ISR: corta y rápida
  cuentas++;
}

void setup() {
  pinMode(SENSOR, INPUT_PULLUP);
  attachInterrupt(digitalPinToInterrupt(SENSOR), contar, FALLING);
  Serial.begin(9600);
}

void loop() {
  noInterrupts();                     // copia segura
  unsigned long copia = cuentas;
  interrupts();
  Serial.println(copia);
  delay(500);
}
```

| Modo      | Se dispara cuando el pin…  |
| --------- | -------------------------- |
| `RISING`  | Pasa de LOW a HIGH         |
| `FALLING` | Pasa de HIGH a LOW         |
| `CHANGE`  | Cambia en cualquier sentido |
| `LOW`     | Está en LOW                |

Dentro de la función de interrupción: nada de `delay()`, ni `Serial.print()`, y `millis()` no
avanza. Solo actualizá variables.

## Tipos de datos (UNO R3)

| Tipo            | Tamaño  | Rango / uso                                   |
| --------------- | ------- | --------------------------------------------- |
| `bool`          | 1 byte  | `true` / `false`                              |
| `char`          | 1 byte  | Un carácter: `'A'` (−128 … 127)               |
| `byte`          | 1 byte  | 0 … 255                                       |
| `int`           | 2 bytes | **−32 768 … 32 767**                          |
| `unsigned int`  | 2 bytes | 0 … 65 535                                    |
| `long`          | 4 bytes | −2 147 483 648 … 2 147 483 647                |
| `unsigned long` | 4 bytes | 0 … 4 294 967 295 (**para tiempo**)           |
| `float`         | 4 bytes | Decimales, ~6-7 dígitos de precisión          |
| `double`        | 4 bytes | En el UNO es **igual** a `float`              |

### Desbordamiento

```cpp
int x = 32767;
x = x + 1;                     // ❌ ahora vale -32768

unsigned long espera = 60 * 1000;    // ❌ 60 * 1000 se calcula como int → 60000 no entra
unsigned long espera2 = 60 * 1000UL; // ✅ UL = unsigned long

float mitad = 5 / 2;           // ❌ 2.0: divide dos enteros primero
float mitad2 = 5.0 / 2;        // ✅ 2.5
```

## Errores comunes

#### No aparece el puerto en _Tools → Port_

Probá otro cable (que sea de datos) y otro puerto USB. Si la placa es un clon con chip CH340,
instalá el driver. Cerrá otros programas que usen el puerto (otro monitor serie, Cura, etc.).

#### `avrdude: stk500_getsync(): not in sync` / `programmer is not responding`

La compu no logra hablar con la placa. Revisá: placa elegida = **Arduino UNO**, puerto
correcto, **nada conectado a los pines 0 y 1** mientras subís, y probá apretar reset justo cuando
empieza a subir.

#### `'algo' was not declared in this scope`

Error de tipeo (C++ distingue **mayúsculas**: `digitalwrite` ≠ `digitalWrite`), falta el
`#include` de la librería, o usás una variable fuera de las llaves `{}` donde la declaraste.

#### `expected ';' before …`

Falta un `;` en la línea **anterior** a la que marca el error.

#### El botón funciona "solo", sin tocarlo

Pin flotando: falta `INPUT_PULLUP` o la resistencia pull-down.

#### Caracteres raros en el monitor serie

El baud rate del monitor no coincide con el de `Serial.begin()`. Si pasa con un módulo, revisá
que los dos usen la misma velocidad y que los GND estén unidos.

#### No aparece nada en el monitor serie

Falta `Serial.begin()` en el `setup`, el baud rate no coincide, elegiste otro puerto, o hay algo
conectado a los pines 0 y 1.

#### `Access is denied`, `Port busy` o `can't open device` al subir

Otro programa tiene el puerto abierto: otra ventana del IDE, el Serial Plotter, un script de
Python. Cerralo y volvé a subir.

#### `parseInt` devuelve un 0 que no mandaste

Quedó el Enter (`\n`) en el buffer y `parseInt` no encontró un número antes del _timeout_. Poné
el monitor en _No Line Ending_ o leé por líneas (ver
[Recibir comandos sin bloquear](#recibir-comandos-sin-bloquear)).

#### El programa se volvió lento al agregar `Serial.print`

El buffer de salida se llena y `print` espera. Subí a `115200` o imprimí menos seguido.

#### `expected unqualified-id before numeric constant`

Un nombre de tu código choca con un `#define` (tuyo o de Arduino). Por ejemplo,
`const int LED_BUILTIN = 13;` se convierte en `const int 13 = 13;`. Cambiá el nombre.

#### `expected ')' before ';' token` en una línea que parece bien

Pusiste `;` al final de un `#define`: con `#define PIN 13;`, la línea `pinMode(PIN, OUTPUT)`
queda `pinMode(13;, OUTPUT)`. Sacá el `;`.

#### El LED no prende

LED al revés (la pata larga va al pin), falta GND, pin distinto al del código, o te olvidaste
`pinMode(pin, OUTPUT)` (en ese caso prende muy débil).

#### El programa anda un rato y después se cuelga o se resetea

Falta de SRAM (muchos `String`, arrays grandes), o un motor/servo que tira del 5 V y hace caer
el voltaje. Usá `F("…")` y fuente externa para motores.

#### `analogWrite` no cambia el brillo

El pin no tiene `~`. Además, `tone()` desactiva el PWM de los pines 3 y 11, y la librería
`Servo` el de los pines 9 y 10.

## Preguntas frecuentes

#### ¿Puedo alimentar el Arduino con una batería de 9 V?

Sí, por el jack o `VIN`, pero esas baterías duran poco. Para proyectos portátiles conviene un
power bank por USB o un pack de pilas.

#### ¿Por qué el `loop` corre tan rápido?

Porque no hace nada más: si no ponés pausas, repite miles de veces por segundo. Si mandás
`Serial.println` sin pausa, el monitor se llena al instante.

#### ¿`delay` o `millis`?

`delay` para pruebas simples y cosas en secuencia. `millis` apenas necesitás hacer dos cosas
a la vez o reaccionar a un botón mientras esperás.

#### ¿Qué diferencia hay entre `const int` y `#define`?

Las dos sirven para constantes. `const` tiene tipo, respeta el alcance y da mejores errores;
`#define` es un reemplazo de texto (y no lleva `;`). Preferí `const` para valores y usá
`#define` para `#if` y macros de debug. Ver la tabla de
[`#define`, `const` o `constexpr`](#define-const-o-constexpr).

#### ¿Puedo usar los pines 0 y 1 como pines comunes?

Sí, pero comparten el puerto serie con el USB: mientras estén ocupados no podés subir sketches
ni usar el monitor serie de forma confiable. Dejalos para lo último.

#### ¿Qué baud rate uso?

Para el monitor serie, `115200`. Para un módulo, **el que diga su hoja de datos** (muchos vienen
en `9600`).

#### ¿Puedo usar los pines analógicos como digitales?

Sí: `pinMode(A0, OUTPUT)` y `digitalWrite(A0, HIGH)` funcionan.

#### ¿Se borra el programa cuando lo desconecto?

No. Queda en la memoria flash hasta que subas otro.

#### ¿Cómo reseteo la placa?

Botón de reset de la placa, o abriendo el monitor serie (reinicia el sketch).

## Fuentes

- [Referencia oficial del lenguaje](https://docs.arduino.cc/language-reference/)
- [Arduino UNO R3: documentación y pinout](https://docs.arduino.cc/hardware/uno-rev3/)
- [Arduino IDE 2: primeros pasos](https://docs.arduino.cc/software/ide-v2/tutorials/getting-started-ide-v2/)
- [Referencia de `Serial`](https://docs.arduino.cc/language-reference/en/functions/communication/serial/)
- [SoftwareSerial](https://docs.arduino.cc/learn/built-in-libraries/software-serial/)
- [Serial Input Basics (foro oficial: leer sin bloquear)](https://forum.arduino.cc/t/serial-input-basics-updated/382007)
- [Blink sin delay (ejemplo oficial)](https://docs.arduino.cc/built-in-examples/digital/BlinkWithoutDelay/)
- [Tinkercad Circuits: simular circuitos con Arduino gratis](https://www.tinkercad.com/circuits)
