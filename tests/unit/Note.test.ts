import Note from "../../src/domain/entity/Note";

test("Deve criar uma Nota", () => {
  const note = new Note("Primeira Nota do Dia", true, new Date());
  expect(note).toBeDefined();
});
