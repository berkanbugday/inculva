-- CreateTable
CREATE TABLE "IkasStore" (
    "id" TEXT NOT NULL,
    "siteId" TEXT NOT NULL,
    "ikasStoreId" TEXT NOT NULL,
    "ikasStoreName" TEXT NOT NULL,
    "accessToken" TEXT NOT NULL,
    "refreshToken" TEXT,
    "storefrontId" TEXT NOT NULL,
    "scriptId" TEXT,
    "installedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "uninstalledAt" TIMESTAMP(3),

    CONSTRAINT "IkasStore_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "IkasStore_siteId_key" ON "IkasStore"("siteId");

-- CreateIndex
CREATE UNIQUE INDEX "IkasStore_ikasStoreId_key" ON "IkasStore"("ikasStoreId");

-- AddForeignKey
ALTER TABLE "IkasStore" ADD CONSTRAINT "IkasStore_siteId_fkey" FOREIGN KEY ("siteId") REFERENCES "Site"("id") ON DELETE CASCADE ON UPDATE CASCADE;
