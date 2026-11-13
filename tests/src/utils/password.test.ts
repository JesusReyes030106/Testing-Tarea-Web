import { describe, test, expect, beforeAll } from "vitest";
import { hashPassword, comparePassword } from "../../../src/utils/password.util";

describe("Encriptacion y verificacion de contraseñas", () => {
  const credenciales = [{ plana: "MiPasswordSegura#1", hash: "" }, { plana: "AccesoAdmin2026$", hash: "" }];
  beforeAll(async () => {
    for (const item of credenciales) {
      item.hash = await hashPassword(item.plana);
    }
  });

  test.each(credenciales)("genera un hash valido y distinto al texto plano", ({ plana, hash }) => {
      expect(typeof hash).toEqual("string");
      expect(hash.trim().length).toBeGreaterThan(0);
      expect(hash).not.toEqual(plana);
    }
  );

  test("verifica correctamente cuando la contraseña coincide con su hash", async () => {
    const [primera, segunda] = credenciales;

    await expect(comparePassword(primera.plana, primera.hash)).resolves.toBeTruthy();
    await expect(comparePassword(segunda.plana, segunda.hash)).resolves.toBeTruthy();
  });

  test("No hace la verificacion si se cruzan hashes o se envian claves incorrectas", async () => {
    const [primera, segunda] = credenciales;
    const cruceUno = await comparePassword(primera.plana, segunda.hash);
    const cruceDos = await comparePassword(segunda.plana, primera.hash);

    expect(cruceUno).toBeFalsy();
    expect(cruceDos).toBeFalsy();
  });
});