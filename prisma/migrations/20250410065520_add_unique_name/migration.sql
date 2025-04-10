/*
  Warnings:

  - A unique constraint covering the columns `[nome]` on the table `lotes` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "lotes_nome_key" ON "lotes"("nome");
