import prisma from '../../../lib/prisma';

export default async function handle(req, res) {
    const { id, text, xValue, yValue } = req.body;
  
    const result = await prisma.note.create({
      data: {
        id: id,
        text: text,
        xValue: xValue,
        yValue: yValue,

      },
    });
    res.json(result);
  }