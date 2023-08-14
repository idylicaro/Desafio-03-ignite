/*
  Warnings:

  - Added the required column `address` to the `Org` table without a default value. This is not possible if the table is not empty.
  - Added the required column `address_number` to the `Org` table without a default value. This is not possible if the table is not empty.
  - Added the required column `city` to the `Org` table without a default value. This is not possible if the table is not empty.
  - Added the required column `phone` to the `Org` table without a default value. This is not possible if the table is not empty.
  - Added the required column `state` to the `Org` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Org" ADD COLUMN     "address" TEXT NOT NULL,
ADD COLUMN     "address_number" TEXT NOT NULL,
ADD COLUMN     "city" TEXT NOT NULL,
ADD COLUMN     "phone" TEXT NOT NULL,
ADD COLUMN     "state" TEXT NOT NULL;
