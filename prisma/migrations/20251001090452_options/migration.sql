-- AlterTable
ALTER TABLE "public"."Product" ALTER COLUMN "servings" DROP NOT NULL,
ALTER COLUMN "reviewCount" DROP NOT NULL,
ALTER COLUMN "caloriesPerServing" DROP NOT NULL,
ALTER COLUMN "rating" DROP NOT NULL;
