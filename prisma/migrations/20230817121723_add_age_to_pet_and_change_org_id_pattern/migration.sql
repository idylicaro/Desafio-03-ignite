/*
  Warnings:

  - You are about to drop the column `color` on the `Pet` table. All the data in the column will be lost.
  - You are about to drop the column `orgId` on the `Pet` table. All the data in the column will be lost.
  - Added the required column `age` to the `Pet` table without a default value. This is not possible if the table is not empty.
  - Added the required column `org_id` to the `Pet` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Pet" DROP CONSTRAINT "Pet_orgId_fkey";

-- AlterTable
ALTER TABLE "Pet" DROP COLUMN "color",
DROP COLUMN "orgId",
ADD COLUMN     "age" INTEGER NOT NULL,
ADD COLUMN     "org_id" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "Pet" ADD CONSTRAINT "Pet_org_id_fkey" FOREIGN KEY ("org_id") REFERENCES "Org"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
