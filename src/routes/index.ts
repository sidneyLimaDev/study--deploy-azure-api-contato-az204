import express from "express";
import { readFile, writeFile } from "fs/promises";

const dataSource = `./data/list.txt`;
const router = express.Router();

router.post(`/contato`, async (req, res) => {
  const { name } = req.body;

  if (!name || name.length < 2) {
    res.json({ error: `Name is required` });
    return;
  }

  let list: string[] = [];
  try {
    const data = await readFile(dataSource, `utf-8`);
    list = data.split(`\n`);
  } catch (error) {}

  list.push(name);
  await writeFile(dataSource, list.join(`\n`));

  res.status(201).json({ contato: name });
});

router.get(`/contatos`, async (req, res) => {
  let list: string[] = [];
  try {
    const data = await readFile(dataSource, `utf-8`);
    list = data.split(`\n`);
  } catch (error) {}

  res.json({ contatos: list });
});

router.delete(`/contato`, async (req, res) => {
  const { name } = req.query;
  if (!name) {
    res.json({ error: `Name is required` });
    return;
  }

  let list: string[] = [];
  try {
    const data = await readFile(dataSource, `utf-8`);
    list = data.split(`\n`);
  } catch (error) {}

  list = list.filter(
    (item) => item.toLowerCase() !== (name as string).toLowerCase()
  );

  await writeFile(dataSource, list.join(`\n`));

  res.json({ contato: name });
});

export default router;
