/*
  Warnings:

  - Changed the type of `price` on the `ingredients` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "ingredients" DROP COLUMN "price",
ADD COLUMN     "price" DOUBLE PRECISION NOT NULL;