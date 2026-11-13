import { describe, test, expect } from "vitest";
import { generateSixDigitCode } from "../../../src/utils/generateCode.util.js";

describe("Pruebas de formato y aleatoriedad", () => {
  test("debe generar una cadena numérica de exactamente 6 caracteres", () => {
    const resultado = generateSixDigitCode();

    expect(resultado).toBeTypeOf("string");
    expect(resultado).toMatch(/^[0-9]{6}$/);
  });

  test("debe producir valores distintos en múltiples ejecuciones", () => {
    const muestras = Array.from({ length: 5 }, () => generateSixDigitCode());
    const valoresUnicos = new Set(muestras);

    expect(valoresUnicos.size).toBeGreaterThan(1);
  });
});