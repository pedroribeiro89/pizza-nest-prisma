-- CreateTable
CREATE TABLE "Pizza" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Ingredient" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "veg" BOOLEAN NOT NULL DEFAULT false,
    "price" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "PizzaIngredient" (
    "pizzaId" INTEGER NOT NULL,
    "ingredientId" INTEGER NOT NULL,

    PRIMARY KEY ("pizzaId", "ingredientId"),
    FOREIGN KEY ("pizzaId") REFERENCES "Pizza" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY ("ingredientId") REFERENCES "Ingredient" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "Pizza.name_unique" ON "Pizza"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Ingredient.name_unique" ON "Ingredient"("name");
