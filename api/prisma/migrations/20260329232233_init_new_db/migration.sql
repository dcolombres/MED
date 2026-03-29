-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Prescription" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "consultationId" TEXT NOT NULL,
    "medications" TEXT NOT NULL,
    "observations" TEXT,
    "pdfUrl" TEXT,
    "verificationCode" TEXT NOT NULL,
    "issuedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "Prescription_consultationId_fkey" FOREIGN KEY ("consultationId") REFERENCES "Consultation" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Prescription" ("consultationId", "id", "issuedAt", "medications", "observations", "pdfUrl", "verificationCode") SELECT "consultationId", "id", "issuedAt", "medications", "observations", "pdfUrl", "verificationCode" FROM "Prescription";
DROP TABLE "Prescription";
ALTER TABLE "new_Prescription" RENAME TO "Prescription";
CREATE UNIQUE INDEX "Prescription_consultationId_key" ON "Prescription"("consultationId");
CREATE UNIQUE INDEX "Prescription_verificationCode_key" ON "Prescription"("verificationCode");
CREATE TABLE "new_Triage" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "symptoms" TEXT NOT NULL,
    "motivo" TEXT,
    "identityNumber" TEXT,
    "requiresCertificate" BOOLEAN NOT NULL DEFAULT false,
    "additionalData" TEXT,
    "status" TEXT NOT NULL DEFAULT 'PENDING',
    "userId" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "Triage_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_Triage" ("additionalData", "createdAt", "id", "identityNumber", "motivo", "requiresCertificate", "status", "symptoms", "updatedAt", "userId") SELECT "additionalData", "createdAt", "id", "identityNumber", "motivo", "requiresCertificate", "status", "symptoms", "updatedAt", "userId" FROM "Triage";
DROP TABLE "Triage";
ALTER TABLE "new_Triage" RENAME TO "Triage";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
