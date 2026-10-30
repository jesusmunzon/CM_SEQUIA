/* DEMANDA: 61 consultas diarias (01/10/2023 - 30/11/2023).
 * Solo cambia DEMANDA AGUA POTABLE. Costes y Acciones permanecen fijos.
 */
const DEMANDA_DATA={
  "demanda": {
    "comparativa": 2023,
    "base": 2019,
    "periodo": "Enero – Octubre",
    "total": {
      "valor": -5.11,
      "objetivo": -10
    },
    "categorias": [
      {
        "id": "domestico",
        "nombre": "DOMÉSTICO",
        "valor": -4.77
      },
      {
        "id": "industrial",
        "nombre": "INDUSTRIAL",
        "valor": -4.75
      },
      {
        "id": "oficial",
        "nombre": "OFICIAL",
        "valor": -15.81
      }
    ],
    "subtipos": [
      {
        "nombre": "Comunitario",
        "valor": -11.4,
        "base": 139.8,
        "actual": 123.9
      },
      {
        "nombre": "Individual en Toma de Batería",
        "valor": -0.5,
        "base": 108.9,
        "actual": 108.4
      },
      {
        "nombre": "Individual Unifamiliar",
        "valor": -3.4,
        "base": 114.9,
        "actual": 111
      }
    ],
    "consumoAnual": [
      {
        "anio": 2019,
        "valor": 112.8
      },
      {
        "anio": 2021,
        "valor": 114.5
      },
      {
        "anio": 2022,
        "valor": 110.6
      },
      {
        "anio": 2023,
        "valor": 106.5
      }
    ]
  },
  "costes": {
    "anios": [
      2022,
      2023,
      2024
    ],
    "filas": [
      {
        "nombre": "Obras e Infraestructuras",
        "datos": [
          {
            "presupuesto": 0.7,
            "incurrido": 0.7
          },
          {
            "presupuesto": 0.8,
            "incurrido": 0.168
          },
          {
            "presupuesto": 1.1,
            "incurrido": 0
          }
        ]
      },
      {
        "nombre": "Recursos externos",
        "detalle": "(Huesna, Intercambio río y Aguas subterráneas)",
        "datos": [
          {
            "presupuesto": 0,
            "incurrido": 0
          },
          {
            "presupuesto": 0,
            "incurrido": 0
          },
          {
            "presupuesto": 6.3,
            "incurrido": 0
          }
        ]
      },
      {
        "nombre": "Operación y Mantenimiento",
        "datos": [
          {
            "presupuesto": 4.8,
            "incurrido": 4.8
          },
          {
            "presupuesto": 2.8,
            "incurrido": 1.848
          },
          {
            "presupuesto": 1.8,
            "incurrido": 0
          }
        ]
      },
      {
        "nombre": "Otros costes",
        "detalle": "(Comunicación y gastos generales)",
        "datos": [
          {
            "presupuesto": 0.2,
            "incurrido": 0.2
          },
          {
            "presupuesto": 0.3,
            "incurrido": 0.21
          },
          {
            "presupuesto": 0.3,
            "incurrido": 0
          }
        ]
      },
      {
        "nombre": "Reducción de ingresos por reducción de consumo",
        "datos": [
          {
            "presupuesto": 0.9,
            "incurrido": 0.9
          },
          {
            "presupuesto": 4,
            "incurrido": 2.92
          },
          {
            "presupuesto": 7,
            "incurrido": 0
          }
        ]
      }
    ],
    "nota": "Gastos incurridos y presupuesto 2024 presentado JG 9/10/2023"
  },
  "acciones": {
    "anios": [
      2022,
      2023,
      2024
    ],
    "anioInicial": 2023,
    "mesInicial": 4,
    "semanasIniciales": {
      "2023-15": 1,
      "2023-21": 1,
      "2023-26": 1,
      "2023-27": 1,
      "2023-28": 1,
      "2023-33": 3,
      "2023-40": 1
    },
    "listado": [
      {
        "id": 1,
        "accion": "OBJETIVO 90. Publicidad exterior: autobuses, mupis",
        "inicio": "2022-03-07",
        "fin": "2022-05-02",
        "importe": 72.9,
        "unidad": "millones"
      },
      {
        "id": 2,
        "accion": "OBJETIVO 90. Campaña en medios: digital, radio",
        "inicio": "2022-03-07",
        "fin": "",
        "importe": 584.8,
        "unidad": "millones"
      },
      {
        "id": 3,
        "accion": "OBJETIVO 90 en Octavillas",
        "inicio": "2022-03-14",
        "fin": "",
        "importe": 17.3,
        "unidad": "miles"
      },
      {
        "id": 4,
        "accion": "El tanque de mi casa",
        "inicio": "2022-03-14",
        "fin": "",
        "importe": 3.1,
        "unidad": "millones"
      },
      {
        "id": 5,
        "accion": "Acciones con HORECA y GC",
        "inicio": "2022-04-04",
        "fin": "",
        "importe": null,
        "unidad": ""
      },
      {
        "id": 6,
        "accion": "OBJETIVO 90. Personalización factura",
        "inicio": "2022-05-02",
        "fin": "",
        "importe": 1.7,
        "unidad": "millones"
      },
      {
        "id": 7,
        "accion": "Visitas culturales EEPP",
        "inicio": "2022-05-23",
        "fin": "",
        "importe": 1196,
        "unidad": "personas"
      },
      {
        "id": 8,
        "accion": "Convenios + bandos",
        "inicio": "2022-06-20",
        "fin": "2022-08-29",
        "importe": 158.7,
        "unidad": "millones"
      },
      {
        "id": 9,
        "accion": "Autobús del agua",
        "inicio": "",
        "fin": "",
        "importe": null,
        "unidad": ""
      },
      {
        "id": 10,
        "accion": "Entrada Alerta y Bando",
        "inicio": "2022-09-26",
        "fin": "",
        "importe": 1252,
        "unidad": "miles"
      },
      {
        "id": 11,
        "accion": "Mailing y SMS alerta por Sequía",
        "inicio": "2022-10-24",
        "fin": "",
        "importe": 410,
        "unidad": "miles"
      },
      {
        "id": 12,
        "accion": "Rueda de prensa Telecultura",
        "inicio": "2023-01-30",
        "fin": "",
        "importe": 118,
        "unidad": "millones"
      },
      {
        "id": 13,
        "accion": "Día mundial del agua",
        "inicio": "2023-03-06",
        "fin": "",
        "importe": 31.7,
        "unidad": "millones"
      },
      {
        "id": 14,
        "accion": "Situación Embalses Declaración Emergencia",
        "inicio": "2023-10-02",
        "fin": "",
        "importe": 244,
        "unidad": "millones"
      }
    ]
  }
};
window.DEMANDA_DATASET={
  "2023-10-01": {
    "comparativa": 2023,
    "base": 2019,
    "periodo": "Enero – Septiembre",
    "total": {
      "valor": -8.8,
      "objetivo": -10
    },
    "categorias": [
      {
        "id": "domestico",
        "nombre": "DOMÉSTICO",
        "valor": -5.2
      },
      {
        "id": "industrial",
        "nombre": "INDUSTRIAL",
        "valor": 0.1
      },
      {
        "id": "oficial",
        "nombre": "OFICIAL",
        "valor": -12.1
      }
    ],
    "subtipos": [
      {
        "nombre": "Comunitario",
        "base": 139.8,
        "actual": 123.9
      },
      {
        "nombre": "Individual en Toma de Batería",
        "base": 108.9,
        "actual": 109.6
      },
      {
        "nombre": "Individual Unifamiliar",
        "base": 114.9,
        "actual": 111
      }
    ],
    "consumoAnual": [
      {
        "anio": 2019,
        "valor": 112.8
      },
      {
        "anio": 2021,
        "valor": 114.5
      },
      {
        "anio": 2022,
        "valor": 110.6
      },
      {
        "anio": 2023,
        "valor": 107.9
      }
    ]
  },
  "2023-10-02": {
    "comparativa": 2023,
    "base": 2019,
    "periodo": "Enero – Septiembre",
    "total": {
      "valor": -8.35,
      "objetivo": -10
    },
    "categorias": [
      {
        "id": "domestico",
        "nombre": "DOMÉSTICO",
        "valor": -4.87
      },
      {
        "id": "industrial",
        "nombre": "INDUSTRIAL",
        "valor": 0.08
      },
      {
        "id": "oficial",
        "nombre": "OFICIAL",
        "valor": -11.54
      }
    ],
    "subtipos": [
      {
        "nombre": "Comunitario",
        "base": 139.8,
        "actual": 124.4
      },
      {
        "nombre": "Individual en Toma de Batería",
        "base": 108.9,
        "actual": 109.5
      },
      {
        "nombre": "Individual Unifamiliar",
        "base": 114.9,
        "actual": 111.3
      }
    ],
    "consumoAnual": [
      {
        "anio": 2019,
        "valor": 112.8
      },
      {
        "anio": 2021,
        "valor": 114.5
      },
      {
        "anio": 2022,
        "valor": 110.6
      },
      {
        "anio": 2023,
        "valor": 107.9
      }
    ]
  },
  "2023-10-03": {
    "comparativa": 2023,
    "base": 2019,
    "periodo": "Enero – Septiembre",
    "total": {
      "valor": -7.92,
      "objetivo": -10
    },
    "categorias": [
      {
        "id": "domestico",
        "nombre": "DOMÉSTICO",
        "valor": -4.55
      },
      {
        "id": "industrial",
        "nombre": "INDUSTRIAL",
        "valor": 0.03
      },
      {
        "id": "oficial",
        "nombre": "OFICIAL",
        "valor": -10.99
      }
    ],
    "subtipos": [
      {
        "nombre": "Comunitario",
        "base": 139.8,
        "actual": 124.9
      },
      {
        "nombre": "Individual en Toma de Batería",
        "base": 108.9,
        "actual": 109.5
      },
      {
        "nombre": "Individual Unifamiliar",
        "base": 114.9,
        "actual": 111.6
      }
    ],
    "consumoAnual": [
      {
        "anio": 2019,
        "valor": 112.8
      },
      {
        "anio": 2021,
        "valor": 114.5
      },
      {
        "anio": 2022,
        "valor": 110.6
      },
      {
        "anio": 2023,
        "valor": 107.9
      }
    ]
  },
  "2023-10-04": {
    "comparativa": 2023,
    "base": 2019,
    "periodo": "Enero – Septiembre",
    "total": {
      "valor": -7.51,
      "objetivo": -10
    },
    "categorias": [
      {
        "id": "domestico",
        "nombre": "DOMÉSTICO",
        "valor": -4.24
      },
      {
        "id": "industrial",
        "nombre": "INDUSTRIAL",
        "valor": -0.05
      },
      {
        "id": "oficial",
        "nombre": "OFICIAL",
        "valor": -10.47
      }
    ],
    "subtipos": [
      {
        "nombre": "Comunitario",
        "base": 139.8,
        "actual": 125.4
      },
      {
        "nombre": "Individual en Toma de Batería",
        "base": 108.9,
        "actual": 109.5
      },
      {
        "nombre": "Individual Unifamiliar",
        "base": 114.9,
        "actual": 111.9
      }
    ],
    "consumoAnual": [
      {
        "anio": 2019,
        "valor": 112.8
      },
      {
        "anio": 2021,
        "valor": 114.5
      },
      {
        "anio": 2022,
        "valor": 110.6
      },
      {
        "anio": 2023,
        "valor": 107.8
      }
    ]
  },
  "2023-10-05": {
    "comparativa": 2023,
    "base": 2019,
    "periodo": "Enero – Septiembre",
    "total": {
      "valor": -7.13,
      "objetivo": -10
    },
    "categorias": [
      {
        "id": "domestico",
        "nombre": "DOMÉSTICO",
        "valor": -3.96
      },
      {
        "id": "industrial",
        "nombre": "INDUSTRIAL",
        "valor": -0.17
      },
      {
        "id": "oficial",
        "nombre": "OFICIAL",
        "valor": -10
      }
    ],
    "subtipos": [
      {
        "nombre": "Comunitario",
        "base": 139.8,
        "actual": 125.9
      },
      {
        "nombre": "Individual en Toma de Batería",
        "base": 108.9,
        "actual": 109.4
      },
      {
        "nombre": "Individual Unifamiliar",
        "base": 114.9,
        "actual": 112.1
      }
    ],
    "consumoAnual": [
      {
        "anio": 2019,
        "valor": 112.8
      },
      {
        "anio": 2021,
        "valor": 114.5
      },
      {
        "anio": 2022,
        "valor": 110.6
      },
      {
        "anio": 2023,
        "valor": 107.8
      }
    ]
  },
  "2023-10-06": {
    "comparativa": 2023,
    "base": 2019,
    "periodo": "Enero – Septiembre",
    "total": {
      "valor": -6.8,
      "objetivo": -10
    },
    "categorias": [
      {
        "id": "domestico",
        "nombre": "DOMÉSTICO",
        "valor": -3.72
      },
      {
        "id": "industrial",
        "nombre": "INDUSTRIAL",
        "valor": -0.32
      },
      {
        "id": "oficial",
        "nombre": "OFICIAL",
        "valor": -9.58
      }
    ],
    "subtipos": [
      {
        "nombre": "Comunitario",
        "base": 139.8,
        "actual": 126.2
      },
      {
        "nombre": "Individual en Toma de Batería",
        "base": 108.9,
        "actual": 109.4
      },
      {
        "nombre": "Individual Unifamiliar",
        "base": 114.9,
        "actual": 112.4
      }
    ],
    "consumoAnual": [
      {
        "anio": 2019,
        "valor": 112.8
      },
      {
        "anio": 2021,
        "valor": 114.5
      },
      {
        "anio": 2022,
        "valor": 110.6
      },
      {
        "anio": 2023,
        "valor": 107.7
      }
    ]
  },
  "2023-10-07": {
    "comparativa": 2023,
    "base": 2019,
    "periodo": "Enero – Septiembre",
    "total": {
      "valor": -6.53,
      "objetivo": -10
    },
    "categorias": [
      {
        "id": "domestico",
        "nombre": "DOMÉSTICO",
        "valor": -3.52
      },
      {
        "id": "industrial",
        "nombre": "INDUSTRIAL",
        "valor": -0.5
      },
      {
        "id": "oficial",
        "nombre": "OFICIAL",
        "valor": -9.24
      }
    ],
    "subtipos": [
      {
        "nombre": "Comunitario",
        "base": 139.8,
        "actual": 126.6
      },
      {
        "nombre": "Individual en Toma de Batería",
        "base": 108.9,
        "actual": 109.3
      },
      {
        "nombre": "Individual Unifamiliar",
        "base": 114.9,
        "actual": 112.5
      }
    ],
    "consumoAnual": [
      {
        "anio": 2019,
        "valor": 112.8
      },
      {
        "anio": 2021,
        "valor": 114.5
      },
      {
        "anio": 2022,
        "valor": 110.6
      },
      {
        "anio": 2023,
        "valor": 107.6
      }
    ]
  },
  "2023-10-08": {
    "comparativa": 2023,
    "base": 2019,
    "periodo": "Enero – Septiembre",
    "total": {
      "valor": -6.32,
      "objetivo": -10
    },
    "categorias": [
      {
        "id": "domestico",
        "nombre": "DOMÉSTICO",
        "valor": -3.36
      },
      {
        "id": "industrial",
        "nombre": "INDUSTRIAL",
        "valor": -0.71
      },
      {
        "id": "oficial",
        "nombre": "OFICIAL",
        "valor": -8.97
      }
    ],
    "subtipos": [
      {
        "nombre": "Comunitario",
        "base": 139.8,
        "actual": 126.8
      },
      {
        "nombre": "Individual en Toma de Batería",
        "base": 108.9,
        "actual": 109.2
      },
      {
        "nombre": "Individual Unifamiliar",
        "base": 114.9,
        "actual": 112.7
      }
    ],
    "consumoAnual": [
      {
        "anio": 2019,
        "valor": 112.8
      },
      {
        "anio": 2021,
        "valor": 114.5
      },
      {
        "anio": 2022,
        "valor": 110.6
      },
      {
        "anio": 2023,
        "valor": 107.5
      }
    ]
  },
  "2023-10-09": {
    "comparativa": 2023,
    "base": 2019,
    "periodo": "Enero – Septiembre",
    "total": {
      "valor": -6.18,
      "objetivo": -10
    },
    "categorias": [
      {
        "id": "domestico",
        "nombre": "DOMÉSTICO",
        "valor": -3.26
      },
      {
        "id": "industrial",
        "nombre": "INDUSTRIAL",
        "valor": -0.94
      },
      {
        "id": "oficial",
        "nombre": "OFICIAL",
        "valor": -8.8
      }
    ],
    "subtipos": [
      {
        "nombre": "Comunitario",
        "base": 139.8,
        "actual": 127
      },
      {
        "nombre": "Individual en Toma de Batería",
        "base": 108.9,
        "actual": 109.1
      },
      {
        "nombre": "Individual Unifamiliar",
        "base": 114.9,
        "actual": 112.8
      }
    ],
    "consumoAnual": [
      {
        "anio": 2019,
        "valor": 112.8
      },
      {
        "anio": 2021,
        "valor": 114.5
      },
      {
        "anio": 2022,
        "valor": 110.6
      },
      {
        "anio": 2023,
        "valor": 107.4
      }
    ]
  },
  "2023-10-10": {
    "comparativa": 2023,
    "base": 2019,
    "periodo": "Enero – Septiembre",
    "total": {
      "valor": -6.11,
      "objetivo": -10
    },
    "categorias": [
      {
        "id": "domestico",
        "nombre": "DOMÉSTICO",
        "valor": -3.21
      },
      {
        "id": "industrial",
        "nombre": "INDUSTRIAL",
        "valor": -1.19
      },
      {
        "id": "oficial",
        "nombre": "OFICIAL",
        "valor": -8.71
      }
    ],
    "subtipos": [
      {
        "nombre": "Comunitario",
        "base": 139.8,
        "actual": 127.1
      },
      {
        "nombre": "Individual en Toma de Batería",
        "base": 108.9,
        "actual": 109
      },
      {
        "nombre": "Individual Unifamiliar",
        "base": 114.9,
        "actual": 112.8
      }
    ],
    "consumoAnual": [
      {
        "anio": 2019,
        "valor": 112.8
      },
      {
        "anio": 2021,
        "valor": 114.5
      },
      {
        "anio": 2022,
        "valor": 110.6
      },
      {
        "anio": 2023,
        "valor": 107.3
      }
    ]
  },
  "2023-10-11": {
    "comparativa": 2023,
    "base": 2019,
    "periodo": "Enero – Septiembre",
    "total": {
      "valor": -6.11,
      "objetivo": -10
    },
    "categorias": [
      {
        "id": "domestico",
        "nombre": "DOMÉSTICO",
        "valor": -3.21
      },
      {
        "id": "industrial",
        "nombre": "INDUSTRIAL",
        "valor": -1.46
      },
      {
        "id": "oficial",
        "nombre": "OFICIAL",
        "valor": -8.72
      }
    ],
    "subtipos": [
      {
        "nombre": "Comunitario",
        "base": 139.8,
        "actual": 127.1
      },
      {
        "nombre": "Individual en Toma de Batería",
        "base": 108.9,
        "actual": 108.9
      },
      {
        "nombre": "Individual Unifamiliar",
        "base": 114.9,
        "actual": 112.8
      }
    ],
    "consumoAnual": [
      {
        "anio": 2019,
        "valor": 112.8
      },
      {
        "anio": 2021,
        "valor": 114.5
      },
      {
        "anio": 2022,
        "valor": 110.6
      },
      {
        "anio": 2023,
        "valor": 107.1
      }
    ]
  },
  "2023-10-12": {
    "comparativa": 2023,
    "base": 2019,
    "periodo": "Enero – Septiembre",
    "total": {
      "valor": -6.19,
      "objetivo": -10
    },
    "categorias": [
      {
        "id": "domestico",
        "nombre": "DOMÉSTICO",
        "valor": -3.27
      },
      {
        "id": "industrial",
        "nombre": "INDUSTRIAL",
        "valor": -1.74
      },
      {
        "id": "oficial",
        "nombre": "OFICIAL",
        "valor": -8.82
      }
    ],
    "subtipos": [
      {
        "nombre": "Comunitario",
        "base": 139.8,
        "actual": 127
      },
      {
        "nombre": "Individual en Toma de Batería",
        "base": 108.9,
        "actual": 108.8
      },
      {
        "nombre": "Individual Unifamiliar",
        "base": 114.9,
        "actual": 112.8
      }
    ],
    "consumoAnual": [
      {
        "anio": 2019,
        "valor": 112.8
      },
      {
        "anio": 2021,
        "valor": 114.5
      },
      {
        "anio": 2022,
        "valor": 110.6
      },
      {
        "anio": 2023,
        "valor": 107
      }
    ]
  },
  "2023-10-13": {
    "comparativa": 2023,
    "base": 2019,
    "periodo": "Enero – Septiembre",
    "total": {
      "valor": -6.34,
      "objetivo": -10
    },
    "categorias": [
      {
        "id": "domestico",
        "nombre": "DOMÉSTICO",
        "valor": -3.38
      },
      {
        "id": "industrial",
        "nombre": "INDUSTRIAL",
        "valor": -2.04
      },
      {
        "id": "oficial",
        "nombre": "OFICIAL",
        "valor": -9.01
      }
    ],
    "subtipos": [
      {
        "nombre": "Comunitario",
        "base": 139.8,
        "actual": 126.8
      },
      {
        "nombre": "Individual en Toma de Batería",
        "base": 108.9,
        "actual": 108.6
      },
      {
        "nombre": "Individual Unifamiliar",
        "base": 114.9,
        "actual": 112.7
      }
    ],
    "consumoAnual": [
      {
        "anio": 2019,
        "valor": 112.8
      },
      {
        "anio": 2021,
        "valor": 114.5
      },
      {
        "anio": 2022,
        "valor": 110.6
      },
      {
        "anio": 2023,
        "valor": 106.8
      }
    ]
  },
  "2023-10-14": {
    "comparativa": 2023,
    "base": 2019,
    "periodo": "Enero – Septiembre",
    "total": {
      "valor": -6.57,
      "objetivo": -10
    },
    "categorias": [
      {
        "id": "domestico",
        "nombre": "DOMÉSTICO",
        "valor": -3.54
      },
      {
        "id": "industrial",
        "nombre": "INDUSTRIAL",
        "valor": -2.35
      },
      {
        "id": "oficial",
        "nombre": "OFICIAL",
        "valor": -9.29
      }
    ],
    "subtipos": [
      {
        "nombre": "Comunitario",
        "base": 139.8,
        "actual": 126.5
      },
      {
        "nombre": "Individual en Toma de Batería",
        "base": 108.9,
        "actual": 108.5
      },
      {
        "nombre": "Individual Unifamiliar",
        "base": 114.9,
        "actual": 112.5
      }
    ],
    "consumoAnual": [
      {
        "anio": 2019,
        "valor": 112.8
      },
      {
        "anio": 2021,
        "valor": 114.5
      },
      {
        "anio": 2022,
        "valor": 110.6
      },
      {
        "anio": 2023,
        "valor": 106.7
      }
    ]
  },
  "2023-10-15": {
    "comparativa": 2023,
    "base": 2019,
    "periodo": "Enero – Septiembre",
    "total": {
      "valor": -6.85,
      "objetivo": -10
    },
    "categorias": [
      {
        "id": "domestico",
        "nombre": "DOMÉSTICO",
        "valor": -3.75
      },
      {
        "id": "industrial",
        "nombre": "INDUSTRIAL",
        "valor": -2.66
      },
      {
        "id": "oficial",
        "nombre": "OFICIAL",
        "valor": -9.64
      }
    ],
    "subtipos": [
      {
        "nombre": "Comunitario",
        "base": 139.8,
        "actual": 126.2
      },
      {
        "nombre": "Individual en Toma de Batería",
        "base": 108.9,
        "actual": 108.4
      },
      {
        "nombre": "Individual Unifamiliar",
        "base": 114.9,
        "actual": 112.3
      }
    ],
    "consumoAnual": [
      {
        "anio": 2019,
        "valor": 112.8
      },
      {
        "anio": 2021,
        "valor": 114.5
      },
      {
        "anio": 2022,
        "valor": 110.6
      },
      {
        "anio": 2023,
        "valor": 106.5
      }
    ]
  },
  "2023-10-16": {
    "comparativa": 2023,
    "base": 2019,
    "periodo": "Enero – Septiembre",
    "total": {
      "valor": -7.18,
      "objetivo": -10
    },
    "categorias": [
      {
        "id": "domestico",
        "nombre": "DOMÉSTICO",
        "valor": -4
      },
      {
        "id": "industrial",
        "nombre": "INDUSTRIAL",
        "valor": -2.97
      },
      {
        "id": "oficial",
        "nombre": "OFICIAL",
        "valor": -10.07
      }
    ],
    "subtipos": [
      {
        "nombre": "Comunitario",
        "base": 139.8,
        "actual": 125.8
      },
      {
        "nombre": "Individual en Toma de Batería",
        "base": 108.9,
        "actual": 108.2
      },
      {
        "nombre": "Individual Unifamiliar",
        "base": 114.9,
        "actual": 112.1
      }
    ],
    "consumoAnual": [
      {
        "anio": 2019,
        "valor": 112.8
      },
      {
        "anio": 2021,
        "valor": 114.5
      },
      {
        "anio": 2022,
        "valor": 110.6
      },
      {
        "anio": 2023,
        "valor": 106.4
      }
    ]
  },
  "2023-10-17": {
    "comparativa": 2023,
    "base": 2019,
    "periodo": "Enero – Septiembre",
    "total": {
      "valor": -7.57,
      "objetivo": -10
    },
    "categorias": [
      {
        "id": "domestico",
        "nombre": "DOMÉSTICO",
        "valor": -4.29
      },
      {
        "id": "industrial",
        "nombre": "INDUSTRIAL",
        "valor": -3.28
      },
      {
        "id": "oficial",
        "nombre": "OFICIAL",
        "valor": -10.55
      }
    ],
    "subtipos": [
      {
        "nombre": "Comunitario",
        "base": 139.8,
        "actual": 125.3
      },
      {
        "nombre": "Individual en Toma de Batería",
        "base": 108.9,
        "actual": 108.1
      },
      {
        "nombre": "Individual Unifamiliar",
        "base": 114.9,
        "actual": 111.8
      }
    ],
    "consumoAnual": [
      {
        "anio": 2019,
        "valor": 112.8
      },
      {
        "anio": 2021,
        "valor": 114.5
      },
      {
        "anio": 2022,
        "valor": 110.6
      },
      {
        "anio": 2023,
        "valor": 106.2
      }
    ]
  },
  "2023-10-18": {
    "comparativa": 2023,
    "base": 2019,
    "periodo": "Enero – Septiembre",
    "total": {
      "valor": -7.98,
      "objetivo": -10
    },
    "categorias": [
      {
        "id": "domestico",
        "nombre": "DOMÉSTICO",
        "valor": -4.59
      },
      {
        "id": "industrial",
        "nombre": "INDUSTRIAL",
        "valor": -3.58
      },
      {
        "id": "oficial",
        "nombre": "OFICIAL",
        "valor": -11.07
      }
    ],
    "subtipos": [
      {
        "nombre": "Comunitario",
        "base": 139.8,
        "actual": 124.8
      },
      {
        "nombre": "Individual en Toma de Batería",
        "base": 108.9,
        "actual": 108
      },
      {
        "nombre": "Individual Unifamiliar",
        "base": 114.9,
        "actual": 111.6
      }
    ],
    "consumoAnual": [
      {
        "anio": 2019,
        "valor": 112.8
      },
      {
        "anio": 2021,
        "valor": 114.5
      },
      {
        "anio": 2022,
        "valor": 110.6
      },
      {
        "anio": 2023,
        "valor": 106.1
      }
    ]
  },
  "2023-10-19": {
    "comparativa": 2023,
    "base": 2019,
    "periodo": "Enero – Septiembre",
    "total": {
      "valor": -8.42,
      "objetivo": -10
    },
    "categorias": [
      {
        "id": "domestico",
        "nombre": "DOMÉSTICO",
        "valor": -4.92
      },
      {
        "id": "industrial",
        "nombre": "INDUSTRIAL",
        "valor": -3.87
      },
      {
        "id": "oficial",
        "nombre": "OFICIAL",
        "valor": -11.62
      }
    ],
    "subtipos": [
      {
        "nombre": "Comunitario",
        "base": 139.8,
        "actual": 124.3
      },
      {
        "nombre": "Individual en Toma de Batería",
        "base": 108.9,
        "actual": 107.9
      },
      {
        "nombre": "Individual Unifamiliar",
        "base": 114.9,
        "actual": 111.3
      }
    ],
    "consumoAnual": [
      {
        "anio": 2019,
        "valor": 112.8
      },
      {
        "anio": 2021,
        "valor": 114.5
      },
      {
        "anio": 2022,
        "valor": 110.6
      },
      {
        "anio": 2023,
        "valor": 105.9
      }
    ]
  },
  "2023-10-20": {
    "comparativa": 2023,
    "base": 2019,
    "periodo": "Enero – Septiembre",
    "total": {
      "valor": -8.87,
      "objetivo": -10
    },
    "categorias": [
      {
        "id": "domestico",
        "nombre": "DOMÉSTICO",
        "valor": -5.25
      },
      {
        "id": "industrial",
        "nombre": "INDUSTRIAL",
        "valor": -4.14
      },
      {
        "id": "oficial",
        "nombre": "OFICIAL",
        "valor": -12.19
      }
    ],
    "subtipos": [
      {
        "nombre": "Comunitario",
        "base": 139.8,
        "actual": 123.8
      },
      {
        "nombre": "Individual en Toma de Batería",
        "base": 108.9,
        "actual": 107.7
      },
      {
        "nombre": "Individual Unifamiliar",
        "base": 114.9,
        "actual": 110.9
      }
    ],
    "consumoAnual": [
      {
        "anio": 2019,
        "valor": 112.8
      },
      {
        "anio": 2021,
        "valor": 114.5
      },
      {
        "anio": 2022,
        "valor": 110.6
      },
      {
        "anio": 2023,
        "valor": 105.8
      }
    ]
  },
  "2023-10-21": {
    "comparativa": 2023,
    "base": 2019,
    "periodo": "Enero – Septiembre",
    "total": {
      "valor": -9.31,
      "objetivo": -10
    },
    "categorias": [
      {
        "id": "domestico",
        "nombre": "DOMÉSTICO",
        "valor": -5.58
      },
      {
        "id": "industrial",
        "nombre": "INDUSTRIAL",
        "valor": -4.4
      },
      {
        "id": "oficial",
        "nombre": "OFICIAL",
        "valor": -12.75
      }
    ],
    "subtipos": [
      {
        "nombre": "Comunitario",
        "base": 139.8,
        "actual": 123.3
      },
      {
        "nombre": "Individual en Toma de Batería",
        "base": 108.9,
        "actual": 107.6
      },
      {
        "nombre": "Individual Unifamiliar",
        "base": 114.9,
        "actual": 110.6
      }
    ],
    "consumoAnual": [
      {
        "anio": 2019,
        "valor": 112.8
      },
      {
        "anio": 2021,
        "valor": 114.5
      },
      {
        "anio": 2022,
        "valor": 110.6
      },
      {
        "anio": 2023,
        "valor": 105.7
      }
    ]
  },
  "2023-10-22": {
    "comparativa": 2023,
    "base": 2019,
    "periodo": "Enero – Septiembre",
    "total": {
      "valor": -9.75,
      "objetivo": -10
    },
    "categorias": [
      {
        "id": "domestico",
        "nombre": "DOMÉSTICO",
        "valor": -5.9
      },
      {
        "id": "industrial",
        "nombre": "INDUSTRIAL",
        "valor": -4.63
      },
      {
        "id": "oficial",
        "nombre": "OFICIAL",
        "valor": -13.29
      }
    ],
    "subtipos": [
      {
        "nombre": "Comunitario",
        "base": 139.8,
        "actual": 122.7
      },
      {
        "nombre": "Individual en Toma de Batería",
        "base": 108.9,
        "actual": 107.5
      },
      {
        "nombre": "Individual Unifamiliar",
        "base": 114.9,
        "actual": 110.3
      }
    ],
    "consumoAnual": [
      {
        "anio": 2019,
        "valor": 112.8
      },
      {
        "anio": 2021,
        "valor": 114.5
      },
      {
        "anio": 2022,
        "valor": 110.6
      },
      {
        "anio": 2023,
        "valor": 105.5
      }
    ]
  },
  "2023-10-23": {
    "comparativa": 2023,
    "base": 2019,
    "periodo": "Enero – Septiembre",
    "total": {
      "valor": -10.15,
      "objetivo": -10
    },
    "categorias": [
      {
        "id": "domestico",
        "nombre": "DOMÉSTICO",
        "valor": -6.2
      },
      {
        "id": "industrial",
        "nombre": "INDUSTRIAL",
        "valor": -4.85
      },
      {
        "id": "oficial",
        "nombre": "OFICIAL",
        "valor": -13.8
      }
    ],
    "subtipos": [
      {
        "nombre": "Comunitario",
        "base": 139.8,
        "actual": 122.3
      },
      {
        "nombre": "Individual en Toma de Batería",
        "base": 108.9,
        "actual": 107.4
      },
      {
        "nombre": "Individual Unifamiliar",
        "base": 114.9,
        "actual": 110.1
      }
    ],
    "consumoAnual": [
      {
        "anio": 2019,
        "valor": 112.8
      },
      {
        "anio": 2021,
        "valor": 114.5
      },
      {
        "anio": 2022,
        "valor": 110.6
      },
      {
        "anio": 2023,
        "valor": 105.4
      }
    ]
  },
  "2023-10-24": {
    "comparativa": 2023,
    "base": 2019,
    "periodo": "Enero – Septiembre",
    "total": {
      "valor": -10.52,
      "objetivo": -10
    },
    "categorias": [
      {
        "id": "domestico",
        "nombre": "DOMÉSTICO",
        "valor": -6.48
      },
      {
        "id": "industrial",
        "nombre": "INDUSTRIAL",
        "valor": -5.03
      },
      {
        "id": "oficial",
        "nombre": "OFICIAL",
        "valor": -14.27
      }
    ],
    "subtipos": [
      {
        "nombre": "Comunitario",
        "base": 139.8,
        "actual": 121.8
      },
      {
        "nombre": "Individual en Toma de Batería",
        "base": 108.9,
        "actual": 107.4
      },
      {
        "nombre": "Individual Unifamiliar",
        "base": 114.9,
        "actual": 109.8
      }
    ],
    "consumoAnual": [
      {
        "anio": 2019,
        "valor": 112.8
      },
      {
        "anio": 2021,
        "valor": 114.5
      },
      {
        "anio": 2022,
        "valor": 110.6
      },
      {
        "anio": 2023,
        "valor": 105.3
      }
    ]
  },
  "2023-10-25": {
    "comparativa": 2023,
    "base": 2019,
    "periodo": "Enero – Septiembre",
    "total": {
      "valor": -10.84,
      "objetivo": -10
    },
    "categorias": [
      {
        "id": "domestico",
        "nombre": "DOMÉSTICO",
        "valor": -6.71
      },
      {
        "id": "industrial",
        "nombre": "INDUSTRIAL",
        "valor": -5.19
      },
      {
        "id": "oficial",
        "nombre": "OFICIAL",
        "valor": -14.67
      }
    ],
    "subtipos": [
      {
        "nombre": "Comunitario",
        "base": 139.8,
        "actual": 121.4
      },
      {
        "nombre": "Individual en Toma de Batería",
        "base": 108.9,
        "actual": 107.3
      },
      {
        "nombre": "Individual Unifamiliar",
        "base": 114.9,
        "actual": 109.6
      }
    ],
    "consumoAnual": [
      {
        "anio": 2019,
        "valor": 112.8
      },
      {
        "anio": 2021,
        "valor": 114.5
      },
      {
        "anio": 2022,
        "valor": 110.6
      },
      {
        "anio": 2023,
        "valor": 105.3
      }
    ]
  },
  "2023-10-26": {
    "comparativa": 2023,
    "base": 2019,
    "periodo": "Enero – Septiembre",
    "total": {
      "valor": -11.11,
      "objetivo": -10
    },
    "categorias": [
      {
        "id": "domestico",
        "nombre": "DOMÉSTICO",
        "valor": -6.91
      },
      {
        "id": "industrial",
        "nombre": "INDUSTRIAL",
        "valor": -5.32
      },
      {
        "id": "oficial",
        "nombre": "OFICIAL",
        "valor": -15.01
      }
    ],
    "subtipos": [
      {
        "nombre": "Comunitario",
        "base": 139.8,
        "actual": 121.1
      },
      {
        "nombre": "Individual en Toma de Batería",
        "base": 108.9,
        "actual": 107.2
      },
      {
        "nombre": "Individual Unifamiliar",
        "base": 114.9,
        "actual": 109.4
      }
    ],
    "consumoAnual": [
      {
        "anio": 2019,
        "valor": 112.8
      },
      {
        "anio": 2021,
        "valor": 114.5
      },
      {
        "anio": 2022,
        "valor": 110.6
      },
      {
        "anio": 2023,
        "valor": 105.2
      }
    ]
  },
  "2023-10-27": {
    "comparativa": 2023,
    "base": 2019,
    "periodo": "Enero – Septiembre",
    "total": {
      "valor": -11.31,
      "objetivo": -10
    },
    "categorias": [
      {
        "id": "domestico",
        "nombre": "DOMÉSTICO",
        "valor": -7.06
      },
      {
        "id": "industrial",
        "nombre": "INDUSTRIAL",
        "valor": -5.41
      },
      {
        "id": "oficial",
        "nombre": "OFICIAL",
        "valor": -15.26
      }
    ],
    "subtipos": [
      {
        "nombre": "Comunitario",
        "base": 139.8,
        "actual": 120.9
      },
      {
        "nombre": "Individual en Toma de Batería",
        "base": 108.9,
        "actual": 107.2
      },
      {
        "nombre": "Individual Unifamiliar",
        "base": 114.9,
        "actual": 109.3
      }
    ],
    "consumoAnual": [
      {
        "anio": 2019,
        "valor": 112.8
      },
      {
        "anio": 2021,
        "valor": 114.5
      },
      {
        "anio": 2022,
        "valor": 110.6
      },
      {
        "anio": 2023,
        "valor": 105.1
      }
    ]
  },
  "2023-10-28": {
    "comparativa": 2023,
    "base": 2019,
    "periodo": "Enero – Septiembre",
    "total": {
      "valor": -11.44,
      "objetivo": -10
    },
    "categorias": [
      {
        "id": "domestico",
        "nombre": "DOMÉSTICO",
        "valor": -7.16
      },
      {
        "id": "industrial",
        "nombre": "INDUSTRIAL",
        "valor": -5.47
      },
      {
        "id": "oficial",
        "nombre": "OFICIAL",
        "valor": -15.42
      }
    ],
    "subtipos": [
      {
        "nombre": "Comunitario",
        "base": 139.8,
        "actual": 120.7
      },
      {
        "nombre": "Individual en Toma de Batería",
        "base": 108.9,
        "actual": 107.2
      },
      {
        "nombre": "Individual Unifamiliar",
        "base": 114.9,
        "actual": 109.2
      }
    ],
    "consumoAnual": [
      {
        "anio": 2019,
        "valor": 112.8
      },
      {
        "anio": 2021,
        "valor": 114.5
      },
      {
        "anio": 2022,
        "valor": 110.6
      },
      {
        "anio": 2023,
        "valor": 105.1
      }
    ]
  },
  "2023-10-29": {
    "comparativa": 2023,
    "base": 2019,
    "periodo": "Enero – Septiembre",
    "total": {
      "valor": -11.5,
      "objetivo": -10
    },
    "categorias": [
      {
        "id": "domestico",
        "nombre": "DOMÉSTICO",
        "valor": -7.2
      },
      {
        "id": "industrial",
        "nombre": "INDUSTRIAL",
        "valor": -5.5
      },
      {
        "id": "oficial",
        "nombre": "OFICIAL",
        "valor": -15.5
      }
    ],
    "subtipos": [
      {
        "nombre": "Comunitario",
        "base": 139.8,
        "actual": 120.7
      },
      {
        "nombre": "Individual en Toma de Batería",
        "base": 108.9,
        "actual": 107.2
      },
      {
        "nombre": "Individual Unifamiliar",
        "base": 114.9,
        "actual": 109.2
      }
    ],
    "consumoAnual": [
      {
        "anio": 2019,
        "valor": 112.8
      },
      {
        "anio": 2021,
        "valor": 114.5
      },
      {
        "anio": 2022,
        "valor": 110.6
      },
      {
        "anio": 2023,
        "valor": 105.1
      }
    ]
  },
  "2023-10-30": {
    "comparativa": 2023,
    "base": 2019,
    "periodo": "Enero – Septiembre",
    "total": {
      "valor": -11.48,
      "objetivo": -10
    },
    "categorias": [
      {
        "id": "domestico",
        "nombre": "DOMÉSTICO",
        "valor": -7.19
      },
      {
        "id": "industrial",
        "nombre": "INDUSTRIAL",
        "valor": -5.49
      },
      {
        "id": "oficial",
        "nombre": "OFICIAL",
        "valor": -15.48
      }
    ],
    "subtipos": [
      {
        "nombre": "Comunitario",
        "base": 139.8,
        "actual": 120.7
      },
      {
        "nombre": "Individual en Toma de Batería",
        "base": 108.9,
        "actual": 107.2
      },
      {
        "nombre": "Individual Unifamiliar",
        "base": 114.9,
        "actual": 109.2
      }
    ],
    "consumoAnual": [
      {
        "anio": 2019,
        "valor": 112.8
      },
      {
        "anio": 2021,
        "valor": 114.5
      },
      {
        "anio": 2022,
        "valor": 110.6
      },
      {
        "anio": 2023,
        "valor": 105.1
      }
    ]
  },
  "2023-10-31": {
    "comparativa": 2023,
    "base": 2019,
    "periodo": "Enero – Septiembre",
    "total": {
      "valor": -11.39,
      "objetivo": -10
    },
    "categorias": [
      {
        "id": "domestico",
        "nombre": "DOMÉSTICO",
        "valor": -7.12
      },
      {
        "id": "industrial",
        "nombre": "INDUSTRIAL",
        "valor": -5.45
      },
      {
        "id": "oficial",
        "nombre": "OFICIAL",
        "valor": -15.36
      }
    ],
    "subtipos": [
      {
        "nombre": "Comunitario",
        "base": 139.8,
        "actual": 120.8
      },
      {
        "nombre": "Individual en Toma de Batería",
        "base": 108.9,
        "actual": 107.2
      },
      {
        "nombre": "Individual Unifamiliar",
        "base": 114.9,
        "actual": 109.2
      }
    ],
    "consumoAnual": [
      {
        "anio": 2019,
        "valor": 112.8
      },
      {
        "anio": 2021,
        "valor": 114.5
      },
      {
        "anio": 2022,
        "valor": 110.6
      },
      {
        "anio": 2023,
        "valor": 105.1
      }
    ]
  },
  "2023-11-01": {
    "comparativa": 2023,
    "base": 2019,
    "periodo": "Enero – Octubre",
    "total": {
      "valor": -11.23,
      "objetivo": -10
    },
    "categorias": [
      {
        "id": "domestico",
        "nombre": "DOMÉSTICO",
        "valor": -7
      },
      {
        "id": "industrial",
        "nombre": "INDUSTRIAL",
        "valor": -5.37
      },
      {
        "id": "oficial",
        "nombre": "OFICIAL",
        "valor": -15.16
      }
    ],
    "subtipos": [
      {
        "nombre": "Comunitario",
        "base": 139.8,
        "actual": 121
      },
      {
        "nombre": "Individual en Toma de Batería",
        "base": 108.9,
        "actual": 107.2
      },
      {
        "nombre": "Individual Unifamiliar",
        "base": 114.9,
        "actual": 109.3
      }
    ],
    "consumoAnual": [
      {
        "anio": 2019,
        "valor": 112.8
      },
      {
        "anio": 2021,
        "valor": 114.5
      },
      {
        "anio": 2022,
        "valor": 110.6
      },
      {
        "anio": 2023,
        "valor": 105.2
      }
    ]
  },
  "2023-11-02": {
    "comparativa": 2023,
    "base": 2019,
    "periodo": "Enero – Octubre",
    "total": {
      "valor": -11,
      "objetivo": -10
    },
    "categorias": [
      {
        "id": "domestico",
        "nombre": "DOMÉSTICO",
        "valor": -6.83
      },
      {
        "id": "industrial",
        "nombre": "INDUSTRIAL",
        "valor": -5.26
      },
      {
        "id": "oficial",
        "nombre": "OFICIAL",
        "valor": -14.87
      }
    ],
    "subtipos": [
      {
        "nombre": "Comunitario",
        "base": 139.8,
        "actual": 121.2
      },
      {
        "nombre": "Individual en Toma de Batería",
        "base": 108.9,
        "actual": 107.3
      },
      {
        "nombre": "Individual Unifamiliar",
        "base": 114.9,
        "actual": 109.5
      }
    ],
    "consumoAnual": [
      {
        "anio": 2019,
        "valor": 112.8
      },
      {
        "anio": 2021,
        "valor": 114.5
      },
      {
        "anio": 2022,
        "valor": 110.6
      },
      {
        "anio": 2023,
        "valor": 105.2
      }
    ]
  },
  "2023-11-03": {
    "comparativa": 2023,
    "base": 2019,
    "periodo": "Enero – Octubre",
    "total": {
      "valor": -10.7,
      "objetivo": -10
    },
    "categorias": [
      {
        "id": "domestico",
        "nombre": "DOMÉSTICO",
        "valor": -6.61
      },
      {
        "id": "industrial",
        "nombre": "INDUSTRIAL",
        "valor": -5.12
      },
      {
        "id": "oficial",
        "nombre": "OFICIAL",
        "valor": -14.5
      }
    ],
    "subtipos": [
      {
        "nombre": "Comunitario",
        "base": 139.8,
        "actual": 121.6
      },
      {
        "nombre": "Individual en Toma de Batería",
        "base": 108.9,
        "actual": 107.3
      },
      {
        "nombre": "Individual Unifamiliar",
        "base": 114.9,
        "actual": 109.7
      }
    ],
    "consumoAnual": [
      {
        "anio": 2019,
        "valor": 112.8
      },
      {
        "anio": 2021,
        "valor": 114.5
      },
      {
        "anio": 2022,
        "valor": 110.6
      },
      {
        "anio": 2023,
        "valor": 105.3
      }
    ]
  },
  "2023-11-04": {
    "comparativa": 2023,
    "base": 2019,
    "periodo": "Enero – Octubre",
    "total": {
      "valor": -10.36,
      "objetivo": -10
    },
    "categorias": [
      {
        "id": "domestico",
        "nombre": "DOMÉSTICO",
        "valor": -6.36
      },
      {
        "id": "industrial",
        "nombre": "INDUSTRIAL",
        "valor": -4.95
      },
      {
        "id": "oficial",
        "nombre": "OFICIAL",
        "valor": -14.07
      }
    ],
    "subtipos": [
      {
        "nombre": "Comunitario",
        "base": 139.8,
        "actual": 122
      },
      {
        "nombre": "Individual en Toma de Batería",
        "base": 108.9,
        "actual": 107.4
      },
      {
        "nombre": "Individual Unifamiliar",
        "base": 114.9,
        "actual": 109.9
      }
    ],
    "consumoAnual": [
      {
        "anio": 2019,
        "valor": 112.8
      },
      {
        "anio": 2021,
        "valor": 114.5
      },
      {
        "anio": 2022,
        "valor": 110.6
      },
      {
        "anio": 2023,
        "valor": 105.4
      }
    ]
  },
  "2023-11-05": {
    "comparativa": 2023,
    "base": 2019,
    "periodo": "Enero – Octubre",
    "total": {
      "valor": -9.97,
      "objetivo": -10
    },
    "categorias": [
      {
        "id": "domestico",
        "nombre": "DOMÉSTICO",
        "valor": -6.07
      },
      {
        "id": "industrial",
        "nombre": "INDUSTRIAL",
        "valor": -4.75
      },
      {
        "id": "oficial",
        "nombre": "OFICIAL",
        "valor": -13.58
      }
    ],
    "subtipos": [
      {
        "nombre": "Comunitario",
        "base": 139.8,
        "actual": 122.5
      },
      {
        "nombre": "Individual en Toma de Batería",
        "base": 108.9,
        "actual": 107.5
      },
      {
        "nombre": "Individual Unifamiliar",
        "base": 114.9,
        "actual": 110.2
      }
    ],
    "consumoAnual": [
      {
        "anio": 2019,
        "valor": 112.8
      },
      {
        "anio": 2021,
        "valor": 114.5
      },
      {
        "anio": 2022,
        "valor": 110.6
      },
      {
        "anio": 2023,
        "valor": 105.5
      }
    ]
  },
  "2023-11-06": {
    "comparativa": 2023,
    "base": 2019,
    "periodo": "Enero – Octubre",
    "total": {
      "valor": -9.55,
      "objetivo": -10
    },
    "categorias": [
      {
        "id": "domestico",
        "nombre": "DOMÉSTICO",
        "valor": -5.76
      },
      {
        "id": "industrial",
        "nombre": "INDUSTRIAL",
        "valor": -4.53
      },
      {
        "id": "oficial",
        "nombre": "OFICIAL",
        "valor": -13.05
      }
    ],
    "subtipos": [
      {
        "nombre": "Comunitario",
        "base": 139.8,
        "actual": 123
      },
      {
        "nombre": "Individual en Toma de Batería",
        "base": 108.9,
        "actual": 107.6
      },
      {
        "nombre": "Individual Unifamiliar",
        "base": 114.9,
        "actual": 110.5
      }
    ],
    "consumoAnual": [
      {
        "anio": 2019,
        "valor": 112.8
      },
      {
        "anio": 2021,
        "valor": 114.5
      },
      {
        "anio": 2022,
        "valor": 110.6
      },
      {
        "anio": 2023,
        "valor": 105.6
      }
    ]
  },
  "2023-11-07": {
    "comparativa": 2023,
    "base": 2019,
    "periodo": "Enero – Octubre",
    "total": {
      "valor": -5.11,
      "objetivo": -10
    },
    "categorias": [
      {
        "id": "domestico",
        "nombre": "DOMÉSTICO",
        "valor": -4.77
      },
      {
        "id": "industrial",
        "nombre": "INDUSTRIAL",
        "valor": -4.75
      },
      {
        "id": "oficial",
        "nombre": "OFICIAL",
        "valor": -15.81
      }
    ],
    "subtipos": [
      {
        "nombre": "Comunitario",
        "base": 139.8,
        "actual": 123.9
      },
      {
        "nombre": "Individual en Toma de Batería",
        "base": 108.9,
        "actual": 108.4
      },
      {
        "nombre": "Individual Unifamiliar",
        "base": 114.9,
        "actual": 111
      }
    ],
    "consumoAnual": [
      {
        "anio": 2019,
        "valor": 112.8
      },
      {
        "anio": 2021,
        "valor": 114.5
      },
      {
        "anio": 2022,
        "valor": 110.6
      },
      {
        "anio": 2023,
        "valor": 106.5
      }
    ]
  },
  "2023-11-08": {
    "comparativa": 2023,
    "base": 2019,
    "periodo": "Enero – Octubre",
    "total": {
      "valor": -8.66,
      "objetivo": -10
    },
    "categorias": [
      {
        "id": "domestico",
        "nombre": "DOMÉSTICO",
        "valor": -5.1
      },
      {
        "id": "industrial",
        "nombre": "INDUSTRIAL",
        "valor": -4.02
      },
      {
        "id": "oficial",
        "nombre": "OFICIAL",
        "valor": -11.93
      }
    ],
    "subtipos": [
      {
        "nombre": "Comunitario",
        "base": 139.8,
        "actual": 124
      },
      {
        "nombre": "Individual en Toma de Batería",
        "base": 108.9,
        "actual": 107.8
      },
      {
        "nombre": "Individual Unifamiliar",
        "base": 114.9,
        "actual": 111.1
      }
    ],
    "consumoAnual": [
      {
        "anio": 2019,
        "valor": 112.8
      },
      {
        "anio": 2021,
        "valor": 114.5
      },
      {
        "anio": 2022,
        "valor": 110.6
      },
      {
        "anio": 2023,
        "valor": 105.8
      }
    ]
  },
  "2023-11-09": {
    "comparativa": 2023,
    "base": 2019,
    "periodo": "Enero – Octubre",
    "total": {
      "valor": -8.22,
      "objetivo": -10
    },
    "categorias": [
      {
        "id": "domestico",
        "nombre": "DOMÉSTICO",
        "valor": -4.77
      },
      {
        "id": "industrial",
        "nombre": "INDUSTRIAL",
        "valor": -3.74
      },
      {
        "id": "oficial",
        "nombre": "OFICIAL",
        "valor": -11.37
      }
    ],
    "subtipos": [
      {
        "nombre": "Comunitario",
        "base": 139.8,
        "actual": 124.6
      },
      {
        "nombre": "Individual en Toma de Batería",
        "base": 108.9,
        "actual": 107.9
      },
      {
        "nombre": "Individual Unifamiliar",
        "base": 114.9,
        "actual": 111.4
      }
    ],
    "consumoAnual": [
      {
        "anio": 2019,
        "valor": 112.8
      },
      {
        "anio": 2021,
        "valor": 114.5
      },
      {
        "anio": 2022,
        "valor": 110.6
      },
      {
        "anio": 2023,
        "valor": 106
      }
    ]
  },
  "2023-11-10": {
    "comparativa": 2023,
    "base": 2019,
    "periodo": "Enero – Octubre",
    "total": {
      "valor": -7.79,
      "objetivo": -10
    },
    "categorias": [
      {
        "id": "domestico",
        "nombre": "DOMÉSTICO",
        "valor": -4.45
      },
      {
        "id": "industrial",
        "nombre": "INDUSTRIAL",
        "valor": -3.44
      },
      {
        "id": "oficial",
        "nombre": "OFICIAL",
        "valor": -10.83
      }
    ],
    "subtipos": [
      {
        "nombre": "Comunitario",
        "base": 139.8,
        "actual": 125.1
      },
      {
        "nombre": "Individual en Toma de Batería",
        "base": 108.9,
        "actual": 108
      },
      {
        "nombre": "Individual Unifamiliar",
        "base": 114.9,
        "actual": 111.7
      }
    ],
    "consumoAnual": [
      {
        "anio": 2019,
        "valor": 112.8
      },
      {
        "anio": 2021,
        "valor": 114.5
      },
      {
        "anio": 2022,
        "valor": 110.6
      },
      {
        "anio": 2023,
        "valor": 106.1
      }
    ]
  },
  "2023-11-11": {
    "comparativa": 2023,
    "base": 2019,
    "periodo": "Enero – Octubre",
    "total": {
      "valor": -7.39,
      "objetivo": -10
    },
    "categorias": [
      {
        "id": "domestico",
        "nombre": "DOMÉSTICO",
        "valor": -4.15
      },
      {
        "id": "industrial",
        "nombre": "INDUSTRIAL",
        "valor": -3.14
      },
      {
        "id": "oficial",
        "nombre": "OFICIAL",
        "valor": -10.32
      }
    ],
    "subtipos": [
      {
        "nombre": "Comunitario",
        "base": 139.8,
        "actual": 125.5
      },
      {
        "nombre": "Individual en Toma de Batería",
        "base": 108.9,
        "actual": 108.2
      },
      {
        "nombre": "Individual Unifamiliar",
        "base": 114.9,
        "actual": 112
      }
    ],
    "consumoAnual": [
      {
        "anio": 2019,
        "valor": 112.8
      },
      {
        "anio": 2021,
        "valor": 114.5
      },
      {
        "anio": 2022,
        "valor": 110.6
      },
      {
        "anio": 2023,
        "valor": 106.3
      }
    ]
  },
  "2023-11-12": {
    "comparativa": 2023,
    "base": 2019,
    "periodo": "Enero – Octubre",
    "total": {
      "valor": -7.03,
      "objetivo": -10
    },
    "categorias": [
      {
        "id": "domestico",
        "nombre": "DOMÉSTICO",
        "valor": -3.89
      },
      {
        "id": "industrial",
        "nombre": "INDUSTRIAL",
        "valor": -2.83
      },
      {
        "id": "oficial",
        "nombre": "OFICIAL",
        "valor": -9.87
      }
    ],
    "subtipos": [
      {
        "nombre": "Comunitario",
        "base": 139.8,
        "actual": 126
      },
      {
        "nombre": "Individual en Toma de Batería",
        "base": 108.9,
        "actual": 108.3
      },
      {
        "nombre": "Individual Unifamiliar",
        "base": 114.9,
        "actual": 112.2
      }
    ],
    "consumoAnual": [
      {
        "anio": 2019,
        "valor": 112.8
      },
      {
        "anio": 2021,
        "valor": 114.5
      },
      {
        "anio": 2022,
        "valor": 110.6
      },
      {
        "anio": 2023,
        "valor": 106.4
      }
    ]
  },
  "2023-11-13": {
    "comparativa": 2023,
    "base": 2019,
    "periodo": "Enero – Octubre",
    "total": {
      "valor": -6.71,
      "objetivo": -10
    },
    "categorias": [
      {
        "id": "domestico",
        "nombre": "DOMÉSTICO",
        "valor": -3.65
      },
      {
        "id": "industrial",
        "nombre": "INDUSTRIAL",
        "valor": -2.52
      },
      {
        "id": "oficial",
        "nombre": "OFICIAL",
        "valor": -9.47
      }
    ],
    "subtipos": [
      {
        "nombre": "Comunitario",
        "base": 139.8,
        "actual": 126.3
      },
      {
        "nombre": "Individual en Toma de Batería",
        "base": 108.9,
        "actual": 108.4
      },
      {
        "nombre": "Individual Unifamiliar",
        "base": 114.9,
        "actual": 112.4
      }
    ],
    "consumoAnual": [
      {
        "anio": 2019,
        "valor": 112.8
      },
      {
        "anio": 2021,
        "valor": 114.5
      },
      {
        "anio": 2022,
        "valor": 110.6
      },
      {
        "anio": 2023,
        "valor": 106.6
      }
    ]
  },
  "2023-11-14": {
    "comparativa": 2023,
    "base": 2019,
    "periodo": "Enero – Octubre",
    "total": {
      "valor": -6.46,
      "objetivo": -10
    },
    "categorias": [
      {
        "id": "domestico",
        "nombre": "DOMÉSTICO",
        "valor": -3.47
      },
      {
        "id": "industrial",
        "nombre": "INDUSTRIAL",
        "valor": -2.21
      },
      {
        "id": "oficial",
        "nombre": "OFICIAL",
        "valor": -9.15
      }
    ],
    "subtipos": [
      {
        "nombre": "Comunitario",
        "base": 139.8,
        "actual": 126.7
      },
      {
        "nombre": "Individual en Toma de Batería",
        "base": 108.9,
        "actual": 108.6
      },
      {
        "nombre": "Individual Unifamiliar",
        "base": 114.9,
        "actual": 112.6
      }
    ],
    "consumoAnual": [
      {
        "anio": 2019,
        "valor": 112.8
      },
      {
        "anio": 2021,
        "valor": 114.5
      },
      {
        "anio": 2022,
        "valor": 110.6
      },
      {
        "anio": 2023,
        "valor": 106.7
      }
    ]
  },
  "2023-11-15": {
    "comparativa": 2023,
    "base": 2019,
    "periodo": "Enero – Octubre",
    "total": {
      "valor": -6.27,
      "objetivo": -10
    },
    "categorias": [
      {
        "id": "domestico",
        "nombre": "DOMÉSTICO",
        "valor": -3.32
      },
      {
        "id": "industrial",
        "nombre": "INDUSTRIAL",
        "valor": -1.91
      },
      {
        "id": "oficial",
        "nombre": "OFICIAL",
        "valor": -8.91
      }
    ],
    "subtipos": [
      {
        "nombre": "Comunitario",
        "base": 139.8,
        "actual": 126.9
      },
      {
        "nombre": "Individual en Toma de Batería",
        "base": 108.9,
        "actual": 108.7
      },
      {
        "nombre": "Individual Unifamiliar",
        "base": 114.9,
        "actual": 112.7
      }
    ],
    "consumoAnual": [
      {
        "anio": 2019,
        "valor": 112.8
      },
      {
        "anio": 2021,
        "valor": 114.5
      },
      {
        "anio": 2022,
        "valor": 110.6
      },
      {
        "anio": 2023,
        "valor": 106.9
      }
    ]
  },
  "2023-11-16": {
    "comparativa": 2023,
    "base": 2019,
    "periodo": "Enero – Octubre",
    "total": {
      "valor": -6.15,
      "objetivo": -10
    },
    "categorias": [
      {
        "id": "domestico",
        "nombre": "DOMÉSTICO",
        "valor": -3.23
      },
      {
        "id": "industrial",
        "nombre": "INDUSTRIAL",
        "valor": -1.61
      },
      {
        "id": "oficial",
        "nombre": "OFICIAL",
        "valor": -8.76
      }
    ],
    "subtipos": [
      {
        "nombre": "Comunitario",
        "base": 139.8,
        "actual": 127
      },
      {
        "nombre": "Individual en Toma de Batería",
        "base": 108.9,
        "actual": 108.8
      },
      {
        "nombre": "Individual Unifamiliar",
        "base": 114.9,
        "actual": 112.8
      }
    ],
    "consumoAnual": [
      {
        "anio": 2019,
        "valor": 112.8
      },
      {
        "anio": 2021,
        "valor": 114.5
      },
      {
        "anio": 2022,
        "valor": 110.6
      },
      {
        "anio": 2023,
        "valor": 107
      }
    ]
  },
  "2023-11-17": {
    "comparativa": 2023,
    "base": 2019,
    "periodo": "Enero – Octubre",
    "total": {
      "valor": -6.1,
      "objetivo": -10
    },
    "categorias": [
      {
        "id": "domestico",
        "nombre": "DOMÉSTICO",
        "valor": -3.2
      },
      {
        "id": "industrial",
        "nombre": "INDUSTRIAL",
        "valor": -1.33
      },
      {
        "id": "oficial",
        "nombre": "OFICIAL",
        "valor": -8.7
      }
    ],
    "subtipos": [
      {
        "nombre": "Comunitario",
        "base": 139.8,
        "actual": 127.1
      },
      {
        "nombre": "Individual en Toma de Batería",
        "base": 108.9,
        "actual": 108.9
      },
      {
        "nombre": "Individual Unifamiliar",
        "base": 114.9,
        "actual": 112.8
      }
    ],
    "consumoAnual": [
      {
        "anio": 2019,
        "valor": 112.8
      },
      {
        "anio": 2021,
        "valor": 114.5
      },
      {
        "anio": 2022,
        "valor": 110.6
      },
      {
        "anio": 2023,
        "valor": 107.2
      }
    ]
  },
  "2023-11-18": {
    "comparativa": 2023,
    "base": 2019,
    "periodo": "Enero – Octubre",
    "total": {
      "valor": -6.13,
      "objetivo": -10
    },
    "categorias": [
      {
        "id": "domestico",
        "nombre": "DOMÉSTICO",
        "valor": -3.22
      },
      {
        "id": "industrial",
        "nombre": "INDUSTRIAL",
        "valor": -1.07
      },
      {
        "id": "oficial",
        "nombre": "OFICIAL",
        "valor": -8.74
      }
    ],
    "subtipos": [
      {
        "nombre": "Comunitario",
        "base": 139.8,
        "actual": 127
      },
      {
        "nombre": "Individual en Toma de Batería",
        "base": 108.9,
        "actual": 109.1
      },
      {
        "nombre": "Individual Unifamiliar",
        "base": 114.9,
        "actual": 112.8
      }
    ],
    "consumoAnual": [
      {
        "anio": 2019,
        "valor": 112.8
      },
      {
        "anio": 2021,
        "valor": 114.5
      },
      {
        "anio": 2022,
        "valor": 110.6
      },
      {
        "anio": 2023,
        "valor": 107.3
      }
    ]
  },
  "2023-11-19": {
    "comparativa": 2023,
    "base": 2019,
    "periodo": "Enero – Octubre",
    "total": {
      "valor": -6.23,
      "objetivo": -10
    },
    "categorias": [
      {
        "id": "domestico",
        "nombre": "DOMÉSTICO",
        "valor": -3.3
      },
      {
        "id": "industrial",
        "nombre": "INDUSTRIAL",
        "valor": -0.83
      },
      {
        "id": "oficial",
        "nombre": "OFICIAL",
        "valor": -8.86
      }
    ],
    "subtipos": [
      {
        "nombre": "Comunitario",
        "base": 139.8,
        "actual": 126.9
      },
      {
        "nombre": "Individual en Toma de Batería",
        "base": 108.9,
        "actual": 109.2
      },
      {
        "nombre": "Individual Unifamiliar",
        "base": 114.9,
        "actual": 112.7
      }
    ],
    "consumoAnual": [
      {
        "anio": 2019,
        "valor": 112.8
      },
      {
        "anio": 2021,
        "valor": 114.5
      },
      {
        "anio": 2022,
        "valor": 110.6
      },
      {
        "anio": 2023,
        "valor": 107.4
      }
    ]
  },
  "2023-11-20": {
    "comparativa": 2023,
    "base": 2019,
    "periodo": "Enero – Octubre",
    "total": {
      "valor": -6.4,
      "objetivo": -10
    },
    "categorias": [
      {
        "id": "domestico",
        "nombre": "DOMÉSTICO",
        "valor": -3.43
      },
      {
        "id": "industrial",
        "nombre": "INDUSTRIAL",
        "valor": -0.61
      },
      {
        "id": "oficial",
        "nombre": "OFICIAL",
        "valor": -9.08
      }
    ],
    "subtipos": [
      {
        "nombre": "Comunitario",
        "base": 139.8,
        "actual": 126.7
      },
      {
        "nombre": "Individual en Toma de Batería",
        "base": 108.9,
        "actual": 109.3
      },
      {
        "nombre": "Individual Unifamiliar",
        "base": 114.9,
        "actual": 112.6
      }
    ],
    "consumoAnual": [
      {
        "anio": 2019,
        "valor": 112.8
      },
      {
        "anio": 2021,
        "valor": 114.5
      },
      {
        "anio": 2022,
        "valor": 110.6
      },
      {
        "anio": 2023,
        "valor": 107.5
      }
    ]
  },
  "2023-11-21": {
    "comparativa": 2023,
    "base": 2019,
    "periodo": "Enero – Octubre",
    "total": {
      "valor": -6.64,
      "objetivo": -10
    },
    "categorias": [
      {
        "id": "domestico",
        "nombre": "DOMÉSTICO",
        "valor": -3.6
      },
      {
        "id": "industrial",
        "nombre": "INDUSTRIAL",
        "valor": -0.42
      },
      {
        "id": "oficial",
        "nombre": "OFICIAL",
        "valor": -9.39
      }
    ],
    "subtipos": [
      {
        "nombre": "Comunitario",
        "base": 139.8,
        "actual": 126.4
      },
      {
        "nombre": "Individual en Toma de Batería",
        "base": 108.9,
        "actual": 109.3
      },
      {
        "nombre": "Individual Unifamiliar",
        "base": 114.9,
        "actual": 112.5
      }
    ],
    "consumoAnual": [
      {
        "anio": 2019,
        "valor": 112.8
      },
      {
        "anio": 2021,
        "valor": 114.5
      },
      {
        "anio": 2022,
        "valor": 110.6
      },
      {
        "anio": 2023,
        "valor": 107.6
      }
    ]
  },
  "2023-11-22": {
    "comparativa": 2023,
    "base": 2019,
    "periodo": "Enero – Octubre",
    "total": {
      "valor": -6.94,
      "objetivo": -10
    },
    "categorias": [
      {
        "id": "domestico",
        "nombre": "DOMÉSTICO",
        "valor": -3.82
      },
      {
        "id": "industrial",
        "nombre": "INDUSTRIAL",
        "valor": -0.25
      },
      {
        "id": "oficial",
        "nombre": "OFICIAL",
        "valor": -9.76
      }
    ],
    "subtipos": [
      {
        "nombre": "Comunitario",
        "base": 139.8,
        "actual": 126.1
      },
      {
        "nombre": "Individual en Toma de Batería",
        "base": 108.9,
        "actual": 109.4
      },
      {
        "nombre": "Individual Unifamiliar",
        "base": 114.9,
        "actual": 112.3
      }
    ],
    "consumoAnual": [
      {
        "anio": 2019,
        "valor": 112.8
      },
      {
        "anio": 2021,
        "valor": 114.5
      },
      {
        "anio": 2022,
        "valor": 110.6
      },
      {
        "anio": 2023,
        "valor": 107.7
      }
    ]
  },
  "2023-11-23": {
    "comparativa": 2023,
    "base": 2019,
    "periodo": "Enero – Octubre",
    "total": {
      "valor": -7.29,
      "objetivo": -10
    },
    "categorias": [
      {
        "id": "domestico",
        "nombre": "DOMÉSTICO",
        "valor": -4.08
      },
      {
        "id": "industrial",
        "nombre": "INDUSTRIAL",
        "valor": -0.11
      },
      {
        "id": "oficial",
        "nombre": "OFICIAL",
        "valor": -10.2
      }
    ],
    "subtipos": [
      {
        "nombre": "Comunitario",
        "base": 139.8,
        "actual": 125.7
      },
      {
        "nombre": "Individual en Toma de Batería",
        "base": 108.9,
        "actual": 109.5
      },
      {
        "nombre": "Individual Unifamiliar",
        "base": 114.9,
        "actual": 112
      }
    ],
    "consumoAnual": [
      {
        "anio": 2019,
        "valor": 112.8
      },
      {
        "anio": 2021,
        "valor": 114.5
      },
      {
        "anio": 2022,
        "valor": 110.6
      },
      {
        "anio": 2023,
        "valor": 107.8
      }
    ]
  },
  "2023-11-24": {
    "comparativa": 2023,
    "base": 2019,
    "periodo": "Enero – Octubre",
    "total": {
      "valor": -7.69,
      "objetivo": -10
    },
    "categorias": [
      {
        "id": "domestico",
        "nombre": "DOMÉSTICO",
        "valor": -4.38
      },
      {
        "id": "industrial",
        "nombre": "INDUSTRIAL",
        "valor": -0.01
      },
      {
        "id": "oficial",
        "nombre": "OFICIAL",
        "valor": -10.7
      }
    ],
    "subtipos": [
      {
        "nombre": "Comunitario",
        "base": 139.8,
        "actual": 125.2
      },
      {
        "nombre": "Individual en Toma de Batería",
        "base": 108.9,
        "actual": 109.5
      },
      {
        "nombre": "Individual Unifamiliar",
        "base": 114.9,
        "actual": 111.8
      }
    ],
    "consumoAnual": [
      {
        "anio": 2019,
        "valor": 112.8
      },
      {
        "anio": 2021,
        "valor": 114.5
      },
      {
        "anio": 2022,
        "valor": 110.6
      },
      {
        "anio": 2023,
        "valor": 107.8
      }
    ]
  },
  "2023-11-25": {
    "comparativa": 2023,
    "base": 2019,
    "periodo": "Enero – Octubre",
    "total": {
      "valor": -8.11,
      "objetivo": -10
    },
    "categorias": [
      {
        "id": "domestico",
        "nombre": "DOMÉSTICO",
        "valor": -4.69
      },
      {
        "id": "industrial",
        "nombre": "INDUSTRIAL",
        "valor": 0.06
      },
      {
        "id": "oficial",
        "nombre": "OFICIAL",
        "valor": -11.23
      }
    ],
    "subtipos": [
      {
        "nombre": "Comunitario",
        "base": 139.8,
        "actual": 124.7
      },
      {
        "nombre": "Individual en Toma de Batería",
        "base": 108.9,
        "actual": 109.5
      },
      {
        "nombre": "Individual Unifamiliar",
        "base": 114.9,
        "actual": 111.5
      }
    ],
    "consumoAnual": [
      {
        "anio": 2019,
        "valor": 112.8
      },
      {
        "anio": 2021,
        "valor": 114.5
      },
      {
        "anio": 2022,
        "valor": 110.6
      },
      {
        "anio": 2023,
        "valor": 107.9
      }
    ]
  },
  "2023-11-26": {
    "comparativa": 2023,
    "base": 2019,
    "periodo": "Enero – Octubre",
    "total": {
      "valor": -8.55,
      "objetivo": -10
    },
    "categorias": [
      {
        "id": "domestico",
        "nombre": "DOMÉSTICO",
        "valor": -5.02
      },
      {
        "id": "industrial",
        "nombre": "INDUSTRIAL",
        "valor": 0.09
      },
      {
        "id": "oficial",
        "nombre": "OFICIAL",
        "valor": -11.79
      }
    ],
    "subtipos": [
      {
        "nombre": "Comunitario",
        "base": 139.8,
        "actual": 124.2
      },
      {
        "nombre": "Individual en Toma de Batería",
        "base": 108.9,
        "actual": 109.6
      },
      {
        "nombre": "Individual Unifamiliar",
        "base": 114.9,
        "actual": 111.2
      }
    ],
    "consumoAnual": [
      {
        "anio": 2019,
        "valor": 112.8
      },
      {
        "anio": 2021,
        "valor": 114.5
      },
      {
        "anio": 2022,
        "valor": 110.6
      },
      {
        "anio": 2023,
        "valor": 107.9
      }
    ]
  },
  "2023-11-27": {
    "comparativa": 2023,
    "base": 2019,
    "periodo": "Enero – Octubre",
    "total": {
      "valor": -9,
      "objetivo": -10
    },
    "categorias": [
      {
        "id": "domestico",
        "nombre": "DOMÉSTICO",
        "valor": -5.35
      },
      {
        "id": "industrial",
        "nombre": "INDUSTRIAL",
        "valor": 0.1
      },
      {
        "id": "oficial",
        "nombre": "OFICIAL",
        "valor": -12.36
      }
    ],
    "subtipos": [
      {
        "nombre": "Comunitario",
        "base": 139.8,
        "actual": 123.6
      },
      {
        "nombre": "Individual en Toma de Batería",
        "base": 108.9,
        "actual": 109.6
      },
      {
        "nombre": "Individual Unifamiliar",
        "base": 114.9,
        "actual": 110.9
      }
    ],
    "consumoAnual": [
      {
        "anio": 2019,
        "valor": 112.8
      },
      {
        "anio": 2021,
        "valor": 114.5
      },
      {
        "anio": 2022,
        "valor": 110.6
      },
      {
        "anio": 2023,
        "valor": 107.9
      }
    ]
  },
  "2023-11-28": {
    "comparativa": 2023,
    "base": 2019,
    "periodo": "Enero – Octubre",
    "total": {
      "valor": -9.45,
      "objetivo": -10
    },
    "categorias": [
      {
        "id": "domestico",
        "nombre": "DOMÉSTICO",
        "valor": -5.68
      },
      {
        "id": "industrial",
        "nombre": "INDUSTRIAL",
        "valor": 0.06
      },
      {
        "id": "oficial",
        "nombre": "OFICIAL",
        "valor": -12.91
      }
    ],
    "subtipos": [
      {
        "nombre": "Comunitario",
        "base": 139.8,
        "actual": 123.1
      },
      {
        "nombre": "Individual en Toma de Batería",
        "base": 108.9,
        "actual": 109.5
      },
      {
        "nombre": "Individual Unifamiliar",
        "base": 114.9,
        "actual": 110.6
      }
    ],
    "consumoAnual": [
      {
        "anio": 2019,
        "valor": 112.8
      },
      {
        "anio": 2021,
        "valor": 114.5
      },
      {
        "anio": 2022,
        "valor": 110.6
      },
      {
        "anio": 2023,
        "valor": 107.9
      }
    ]
  },
  "2023-11-29": {
    "comparativa": 2023,
    "base": 2019,
    "periodo": "Enero – Octubre",
    "total": {
      "valor": -9.87,
      "objetivo": -10
    },
    "categorias": [
      {
        "id": "domestico",
        "nombre": "DOMÉSTICO",
        "valor": -5.99
      },
      {
        "id": "industrial",
        "nombre": "INDUSTRIAL",
        "valor": 0
      },
      {
        "id": "oficial",
        "nombre": "OFICIAL",
        "valor": -13.45
      }
    ],
    "subtipos": [
      {
        "nombre": "Comunitario",
        "base": 139.8,
        "actual": 122.6
      },
      {
        "nombre": "Individual en Toma de Batería",
        "base": 108.9,
        "actual": 109.5
      },
      {
        "nombre": "Individual Unifamiliar",
        "base": 114.9,
        "actual": 110.3
      }
    ],
    "consumoAnual": [
      {
        "anio": 2019,
        "valor": 112.8
      },
      {
        "anio": 2021,
        "valor": 114.5
      },
      {
        "anio": 2022,
        "valor": 110.6
      },
      {
        "anio": 2023,
        "valor": 107.8
      }
    ]
  },
  "2023-11-30": {
    "comparativa": 2023,
    "base": 2019,
    "periodo": "Enero – Octubre",
    "total": {
      "valor": -10.27,
      "objetivo": -10
    },
    "categorias": [
      {
        "id": "domestico",
        "nombre": "DOMÉSTICO",
        "valor": -6.29
      },
      {
        "id": "industrial",
        "nombre": "INDUSTRIAL",
        "valor": -0.1
      },
      {
        "id": "oficial",
        "nombre": "OFICIAL",
        "valor": -13.95
      }
    ],
    "subtipos": [
      {
        "nombre": "Comunitario",
        "base": 139.8,
        "actual": 122.1
      },
      {
        "nombre": "Individual en Toma de Batería",
        "base": 108.9,
        "actual": 109.5
      },
      {
        "nombre": "Individual Unifamiliar",
        "base": 114.9,
        "actual": 110
      }
    ],
    "consumoAnual": [
      {
        "anio": 2019,
        "valor": 112.8
      },
      {
        "anio": 2021,
        "valor": 114.5
      },
      {
        "anio": 2022,
        "valor": 110.6
      },
      {
        "anio": 2023,
        "valor": 107.8
      }
    ]
  }
};
window.DEMANDA_DATA_DATES=Object.keys(window.DEMANDA_DATASET).sort();
