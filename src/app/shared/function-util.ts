import {HttpRequest, HttpResponse} from '@angular/common/http';
import {NgbDateStruct} from '@ng-bootstrap/ng-bootstrap';


export function getImportErrorMessage(error: string): string {
  // Message d'erreur sur le type de colonne attendue
  if (error.startsWith('error=bad.column.format')) {
    const errorColumn = error.substring(error.lastIndexOf(',column=') + 8, error.lastIndexOf(',expected.column.format'));
    const expectedFormat = error.substring(error.lastIndexOf(',expected.column.format=') + 24, error.lastIndexOf('}'));
    return 'La colonne ' + getColumnLabelFromImportErrorMessage(errorColumn) + ` n'est pas un/une ` + getColumnTypeFromImportErrorMessage(expectedFormat);
  }

  switch (error) {
    // Messages d'erreur d'import des avances frais
    case 'error=null.advanceDate}':
      return 'Date non renseignée';
    case 'error=CashRegister.and.BankAccount.are.null.or.notNull':
      return 'Renseignez soit la caisse, soit le compte bancaire';
    case 'error=cashRegister.not.in.db}':
      return 'Caisse non reconnu';
    case 'bankAccount.not.in.db}':
      return 'Compte bancaire non reconnu';
    case 'error=activityType.not.in.enum}':
      return 'Activité non reconnu';
    case 'error=null.activityType}':
      return 'Activité non renseignée';
    case 'error=workOrder.not.in.db}':
      return 'Ordre de travail bon reconnu';
    case 'error=supplierGuarantee.not.in.db}':
      return 'companie non trouvée pour la caution';
    case 'error=feeAdvanceItemName.null}':
      return 'Libellé non renseigné';
    case 'error=unitAmount.negative.or.null}':
      return 'Montant unitaire négatif ou nulle';
    case 'error=purchaseOrder.not.in.db}':
      return 'Bon de commande non reconnu';
    case 'error=routeSheet.not.in.db}':
      return 'Voyage ou deplacement non reconnu';
    case 'error=complement.not.in.db}':
      return 'Complement non reconnu';
    case 'error=supplierInvoice.not.in.db}':
      return 'Facture fournisseur non reconnu';

    // Messages d'erreur d'import des BCI
    case 'error=null.purchaseDate}':
      return 'Date non renseignée';
    case 'error=null.store}':
      return 'Magasin non renseigné';
    case 'error=sparePart.not.in.db}':
      return 'Pièce detachée non reconnu';
    case 'error=null.sparePart}':
      return 'Pièce detachée non renseigné';
    case 'error=internalPurchaseOrder.exists}':
      return 'BCI existe deja';

    // Messages d'erreur d'import de pièces
    case 'error=negative.minimumStock}':
      return 'Stock minimum négatif';
    case 'error=negative.maximumStock}':
      return 'Stock maximum négatif';
    case 'error=negative.deadStockPeriod}':
      return 'Période de stock mort négative';
    case 'error=negative.excludingUnitTaxAmount}':
      return 'Montant unitaire négatif';
    case 'error=sparePartCategory.not.in.db}':
      return 'Catégorie de pièce non reconnue';
    case 'error=unit.not.in.db}':
      return 'Unité non reconnue';
    case 'error=storage.space.not.in.db}':
      return 'Espace de stockage non reconnu';
    case 'error=code.already.used}':
      return 'Code déja utilisé';
    case 'error=name.already.used}':
      return 'Nom déja utilisé';
    case 'error=reference.already.used}':
      return 'Référence déja utilisée';

    // Messages d'erreur d'import des inventaires
    case 'error=sparePartCode.not.in.db}':
      return 'Code pièce non reconnu';
    case 'error=store.not.in.db}':
      return 'Magasin non reconnu';

    // messages d'erreur d'import des bon de conso carburant
    case 'error=null.voucherDate}':
      return 'Date non renseignée';
    case 'error=future.voucherDate}':
      return 'Date supérieure à la date actuelle';
    case 'error=type.not.recognised}':
      return 'Type non reconnu';
    case 'error=collaborator.not.in.db}':
      return 'Bénéficiaire non reconnu';
    case 'error=quantity.negative.or.null}':
      return 'Quantité négative ou nulle';
    case 'error=observation.null}':
      return 'Observation non renseignée';
    case 'error=equipment.not.in.db}':
      return 'Equipement non reconnu';
    case 'error=externalStation.null}':
      return 'Station externe non renseignée';
    case 'error=tank.null}':
      return 'Cuve non renseignée';
    case 'error=tank.not.in.db}':
      return 'Cuve non reconnue';
    case 'error=stationOperatorEmployee.not.in.db}':
      return 'Pompiste non reconnu';
    case 'error=consumptionCard.null}':
      return 'Carte de consommation non renseignée';
    case 'error=consumptionCard.not.in.db}':
      return 'Carte de consommation non reconnue';
    case 'error=fuelVoucher.exists}':
      return 'Bon de conso. déja enregistré';
    case 'error=null.type}':
      return 'Type non renseigné';
    case 'error=null.collaborator}':
      return 'Bénéficiaire non renseigné';
    case 'error=excludingTaxUnitPrice.negative}':
      return 'Prix à la pompe négatif';

    // messages d'erreur d'import de rubriques budgétaires
    case 'error=budget.not.in.db}':
      return 'Budget non reconnu';
    case 'error=null.budget}':
      return 'Budget non renseigné';
    case 'error=budgetSectionName.exists}':
      return 'Non de rubrique déja utilisé';
    case 'error=null.budgetSectionName}':
      return 'Non de rubrique non renseigné';
    case 'error=parentBudgetSection.not.in.db}':
      return 'Rubrique parente non reconnue';
    case 'error=commitmentBudgetSection.not.in.db}':
      return `Rubrique du budget d'engagement non reconnue`;
    case 'error=operatingBudgetSection.not.in.db}':
      return `Rubrique du budget de fonctionnement non reconnue`;

    // messages d'erreur d'import des prévisions budgétaires
    case 'error=budgetSection.not.in.db}':
      return `Rubrique non reconnue`;
    case 'error=null.budgetSection}':
      return `Rubrique non renseignée`;
    case 'error=department.not.in.db}':
      return `Département non reconnue`;
    case 'error=null.department}':
      return `Département non renseigné`;
    case 'error=site.not.in.db}':
      return `Site non reconnu`;
    case 'error=null.site}':
      return `Site non renseigné`;
    case 'error=null.startDate}':
      return `Date de début non renseignée`;
    case 'error=null.endDate}':
      return `Date de fin non renseignée`;
    case 'error=startDate.after.endDate}':
      return `Date de début postérieure à date de fin`;
    case 'error=budgetForecast.exists}':
      return `Prévision existante`;
    case 'error=parentBudgetSection}':
      return `Rubrique avec sous rubriques`;
    case 'error=parentDepartment}':
      return `Département avec sous départements`;
    case 'error=parentSite}':
      return `Site avec sous sites`;
    case 'error=startDate.not.in.budget}':
      return `Date de début pas contenue dans le budget`;
    case 'error=endDate.not.in.budget}':
      return `Date de fin pas contenue dans le budget`;
    case 'error=startDate.endDate.more.than.one.period}':
      return `Date de début-date de fin est plus d'une période`;

    // messages d'erreur d'import de comptes de comptabilité
    case 'error=code.exists}':
      return 'Code existe deja';
    case 'error=null.code}':
      return 'Code non renseigné';
    case 'error=null.name}':
      return 'Nom non renseigné';
    case 'error=notCorrect.code}':
      return 'Le code doit comporter au moins 2 chiffres';

    default:
      return null;
  }
}

export function getColumnLabelFromImportErrorMessage(column: string): string {
  switch (column) {
    case 'code':
      return 'Code';
    case 'name':
      return 'Nom';
    case 'reference':
      return 'Référence';
    case 'minimumStock':
      return 'Stock minimum';
    case 'maximumStock':
      return 'Stock maximum';
    case 'deadStockPeriod':
      return 'Période de stock mort';
    case 'consumable':
      return 'Consommable';
    case 'excludingUnitTaxAmount':
      return 'Montant unitaire HT';
    case 'returnRequired':
      return 'Retour requis';

    // inventaire

    case 'sparePartCode':
      return 'Code pièce';
    case 'sparePartName':
      return 'Nom pièce';
    case 'storeName':
      return 'Magasin';
    case 'excludingTaxUnitAmount':
      return 'Montant unitaire HT';
    case 'quantity':
      return 'Quantité';

    default:
      return null;
  }
}

export function getColumnTypeFromImportErrorMessage(column: string): string {
  switch (column) {
    case 'float':
      return 'nombre réel';
    case 'double':
      return 'nombre réel';
    case 'int':
      return 'nombre entier';
    case 'String':
      return 'chaine de caractère';
    case 'boolean':
      return 'booléen (oui ou non)';
    case 'NUMERIC':
      return 'nombre';
    case 'STRING':
      return 'chaine de caractère';
    default:
      return null;
  }
}

export function isAvailable(firstArray: Array<string>, secondArray: Array<any>): boolean {
  // tslint:disable-next-line:prefer-for-of
  for (let i = 0; i < firstArray.length; i++) {
    if (secondArray.some(element => element.authority === firstArray[i].trim())) {
      return true;
    }
  }
  return false;
}

export function enabledStatus(status: boolean) {
  return status
    ? {text: 'Activé', class: 'success'}
    : {text: 'Désactivé', class: 'danger'};
}

export function getCurrentYearFirstDayNgbDateStruct(): NgbDateStruct {
  const now = new Date();
  const firstDay = new Date(now.getFullYear(), 0, 1);
  return {year: firstDay.getFullYear(), month: firstDay.getMonth() + 1, day: firstDay.getDate()};
}

export function getCurrentYearLastDayNgbDateStruct(): NgbDateStruct {
  const now = new Date();
  const lastDay = new Date(now.getFullYear(), 11, 31);
  return {year: lastDay.getFullYear(), month: lastDay.getMonth() + 1, day: lastDay.getDate()};
}

export function getCurrentDateNgbDateStruct(): NgbDateStruct {
  const now = new Date();
  return {year: now.getFullYear(), month: now.getMonth() + 1, day: now.getDate()};
}

export function getCurrentYear() {
  const now = new Date();
  return now.getFullYear();
}

export const reducer = (total, currentValue) => total + currentValue;

export function fileIcon(icons: any, file) {
  let icon = icons.unknown;

  if (/\.zip$|\.tar$|\.tar\.gz$|\.rar$/i.test(file.name)) {
    icon = icons.archive;
  }
  if (/\.jpg$|\.png$|\.gif$|\.jpeg$/i.test(file.name)) {
    icon = icons.image;
  }
  if (/\.mp3$|\.wma$|\.ogg$|\.flac$|\.aac$/i.test(file.name)) {
    icon = icons.audio;
  }
  if (/\.avi$|\.flv$|\.wmv$|\.mov$|\.mp4$/i.test(file.name)) {
    icon = icons.video;
  }
  if (/\.js$|\.es6$|\.ts$/i.test(file.name)) {
    icon = icons.js;
  }
  if (/\.doc$|\.docx$/i.test(file.name)) {
    icon = icons.doc;
  }
  if (/\.xls$|\.xlsx$/i.test(file.name)) {
    icon = icons.xlsx;
  }
  if (/\.htm$|\.html$/i.test(file.name)) {
    icon = icons.html;
  }
  if (/\.pdf$/i.test(file.name)) {
    icon = icons.pdf;
  }
  if (/\.txt$/i.test(file.name)) {
    icon = icons.txt;
  }
  if (/\.css$/i.test(file.name)) {
    icon = icons.css;
  }

  return icon;
}

export function isImageType(type: string): boolean {
  return type && /^image\//i.test(type.toLowerCase());
}

export function isFolder(file): boolean {
  return file.type === 'dir';
}

export function isImage(file): boolean {
  return file.type === 'file' && /\.jpg$|\.webp$|\.png$|\.gif$|\.jpeg$/i.test(file.name.toLowerCase());
}

export function isPdf(file): boolean {
  return file.type === 'file' && /\.pdf$/i.test(file.name);
}

export function isFile(file): boolean {
  // return file.type === 'file' && !/\.jpg$|\.png$|\.gif$|\.jpeg$/i.test(file.name);
  return file.type === 'file' || isImage(file);
}

export function taxValue(value: number, fixed: boolean, amount: number): number {
  if (!amount || !value) {
    return 0;
  }

  if (!fixed) {
    return amount * value / 100;
  }

  return value;
}

export function deleteAccent(initialString: string): string {
  return initialString.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
}

export function isMobile(): boolean {
  const ua = navigator.userAgent;
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini|Mobile|mobile|CriOS/i.test(ua);
}

export function getFileExtension(filename: string): string {
  return filename.split('.').pop();
}

export function calculateIncludingTaxAmount(taxFixed: boolean, taxvalue: number, excludingTaxAmount: number): number {
  if (taxFixed) {
    return excludingTaxAmount + taxvalue;
  } else {
    return excludingTaxAmount + excludingTaxAmount * taxvalue / 100;
  }
}

export function calculateExcludingTaxAmount(taxFixed: boolean, taxvalue: number, includingTaxAmount: number): number {
  if (taxFixed) {
    return includingTaxAmount - taxvalue;
  } else {
    return includingTaxAmount / (1 + (taxvalue / 100));
  }
}

export function checkIfShortcutExists(className: string): boolean {
  switch (className) {
    case 'Customer':
      return false;
    case 'Equipment':
      return true;
    case 'PurchaseOrder':
    case 'PurchaseOrderItem':
      return true;
    case 'TransitRecord' :
      return true;
    case 'TransferVoucher' :
      return true;
    case 'SparePart':
      return true;
    case 'TransitQuote' :
    case 'TransitQuoteItem' :
      return true;
    case 'WorkOrder' :
    case 'WorkOrderItem' :
      return true;
    case 'TransportOrder' :
      return true;
    case 'TransitInvoice' :
    case 'TransitInvoiceItem' :
      return true;
    case 'TransportInvoice' :
      return true;
    case 'ParkInvoice' :
    case 'ParkInvoiceItem' :
      return true;
    case 'ShippingInvoice' :
      return true;
    case 'FeeAdvance' :
    case 'FeeAdvanceItem' :
      return true;
    case 'Supplier' :
      return true;
    case 'InternalPurchaseOrder' :
    case 'InternalPurchaseOrderItem' :
      return true;
    case 'ExitVoucher' :
    case 'ExitVoucherItem' :
      return true;
    case 'PurchaseRequest' :
    case 'PurchaseRequestItem' :
      return true;
    case 'PurchaseRequestAll' :
      return true;
    case 'ReturnVoucher' :
    case 'ReturnVoucherItem' :
      return true;
    case 'DeliveryOrder' :
    case 'DeliveryOrderItem' :
      return true;
    case 'DeliveryOrderAll' :
      return true;
    case 'DeliveryOrderService' :
      return true;
    case 'Inventory' :
      return true;
    case 'FuelVoucher' :
      return true;
    case 'SupplierInvoice' :
      return true;
    case 'Courier' :
      return true;
    case 'CourierForAll' :
      return true;
    case 'TaxCertificate' :
      return true;
    case 'Cheque' :
      return true;
    case 'TransferOrder' :
      return true;
    case 'BudgetRealization' :
      return true;
    case 'BudgetRealizationForAll' :
      return true;
    case 'ShippingRecord' :
      return true;
    case 'ShippingQuote' :
      return true;
    case 'InterventionRequest' :
      return true;
    case 'RouteSheet' :
      return true;
    case 'Complement' :
      return true;
    default:
      return false;
  }
}

export function getShippingQuoteVolume(lengthOverall: number, beam: number, summerDraft: number): number {
  try {
    return Math.ceil(lengthOverall * beam * summerDraft);
  } catch (e) {
    console.error(e);
    return 0;
  }
}

/**
 * Cette fonction vérifie si la clé passée en paramètre existe dans une map : si oui elle ajoute
 * la valeur passée en paramètre à la précédente valeur de la clé ; si non elle insère la valeur
 * dans la map
 * @param key La clé
 * @param value La valeur
 * @param map La map clé/valeur string/number
 */
export function addKeyValueInMap(key: string, value: number, map: Map<string, number>) {
  if (map.has(key)) {
    map.set(key, map.get(key) + value);
  } else {
    map.set(key, value);
  }
}

export function addTokenHeader(request: HttpRequest<any>, token: string): HttpRequest<any> {
  return request.clone({
    setHeaders: {
      Authorization: `Bearer ${token}`
    },
    withCredentials: true
  });
}

export function displayDateDiff(hours: number, minutes: number): string {
  return `${hours} heure(s) ${minutes} minute(s)`;
}

export function getARGBFromHex(color: string): string | null {
  if (!color) {
    return null;
  }
  return color.replace('#', 'FF');
}

export function getInterventionRealWorkTime(realWorkTimeHours: number, realWorkTimeMinits: number): string {
  return (realWorkTimeHours ? realWorkTimeHours : 0) + ' heures ' + (realWorkTimeMinits ? realWorkTimeMinits : 0) + ' minutes';
}

export function getInterventionTotalMinit(realWorkTimeMinits: number): number {
  return realWorkTimeMinits > 59 ? realWorkTimeMinits % 60 : realWorkTimeMinits;
}

export function getInterventionTotalHour(realWorkTimeHours: number, realWorkTimeMinits: number): number {
  return realWorkTimeMinits > 59 ? realWorkTimeHours + Math.floor(realWorkTimeMinits / 60) : realWorkTimeHours;
}

/**
 * Calcule la difference entre deux dates. L'objet retourné est un tableau à 4 éléments :
 * 1er : le nombre de jours d'écart, 2e : le nombre d'heures d'écart, 3e : le nombre de minutes
 * d'écart, 4e : le nombre de secondes d'écart
 * @param date1 La date la plus ancienne. Si cette date est nulle la fonction retourne null
 * @param date2 La date la plus récente. Si cette date est nulle, la fonction retourne l'écart entre
 * date1 et la date actuelle du système
 */
export function getDateDifference(date1: Date, date2: Date): Array<number> {
  if (!date1) {
    return null;
  } else {
    date1 = new Date(date1);
    if (!date2) {
      date2 = new Date();
    } else {
      date2 = new Date(date2);
    }
    let sign = 1;
    let diff = date2.valueOf() - date1.valueOf();
    if (date2.valueOf() <= date1.valueOf()) {
      sign = -1;
      diff = date1.valueOf() - date2.valueOf();
    } else {
      sign = 1;
    }
    const diffDays = Math.floor(diff / (1000 * 3600 * 24));
    const diffHours = Math.floor((diff - diffDays * 1000 * 3600 * 24) / (1000 * 3600));
    const diffMinits = Math.floor((diff - (diffDays * 1000 * 3600 * 24) - (diffHours * 1000 * 3600)) / (1000 * 60));
    const diffSeconds = Math.floor((diff - (diffDays * 1000 * 3600 * 24) - (diffHours * 1000 * 3600) - (diffMinits * 1000 * 60)) / 1000);
    return new Array<number>(sign * diffDays, diffHours, diffMinits, diffSeconds);
  }
}

export function removeUselesChars(text: string, charToRemove: string): string {
  if (!text || !charToRemove) {
    return text;
  } else if (text.includes(charToRemove)) {
    return removeUselesChars(text.replace(charToRemove, ''), charToRemove);
  } else {
    return text;
  }
}
