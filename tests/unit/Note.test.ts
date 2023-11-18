import Note from "../../src/domain/entity/Note";

test("Deve criar uma Nota", () => {
  const note = new Note(2,"Primeira Nota do Dia", true, new Date());
  expect(note.created_at).toBeInstanceOf(Date);
});
