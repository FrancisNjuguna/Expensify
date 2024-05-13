import type {ValueOf} from 'type-fest';
import type CONST from '@src/CONST';
import type {Country} from '@src/CONST';
import type * as OnyxTypes from '.';
import type * as OnyxCommon from './OnyxCommon';
import type {WorkspaceTravelSettings} from './TravelSettings';

/** Distance units */
type Unit = 'mi' | 'km';

/** Model of policy distance rate */
type Rate = OnyxCommon.OnyxValueWithOfflineFeedback<{
    /** Name of the distance rate */
    name?: string;

    /** Amount to be reimbursed per distance unit travelled */
    rate?: number;

    /** Currency used to pay the distance rate */
    currency?: string;

    /** Generated ID to identify the distance rate */
    customUnitRateID?: string;

    /** Whether this distance rate is currently enabled */
    enabled?: boolean;

    /** Error messages to show in UI */
    errors?: OnyxCommon.Errors;

    /** Form fields that triggered the errors */
    errorFields?: OnyxCommon.ErrorFields;
}>;

/** Custom unit attributes */
type Attributes = {
    /** Distance unit name */
    unit: Unit;
};

/** Policy custom unit */
type CustomUnit = OnyxCommon.OnyxValueWithOfflineFeedback<{
    /** Custom unit name */
    name: string;

    /** ID that identifies this custom unit */
    customUnitID: string;

    /** Contains custom attributes like unit, for this custom unit */
    attributes: Attributes;

    /** Distance rates using this custom unit */
    rates: Record<string, Rate>;

    /** The default category in which this custom unit is used */
    defaultCategory?: string;

    /** Whether this custom unit is enabled */
    enabled?: boolean;

    /** Error messages to show in UI */
    errors?: OnyxCommon.Errors;

    /** Form fields that triggered errors */
    errorFields?: OnyxCommon.ErrorFields;
}>;

/** Policy company address data */
type CompanyAddress = {
    /** Street address */
    addressStreet: string;

    /** City */
    city: string;

    /** State */
    state: string;

    /** Zip post code */
    zipCode: string;

    /** Country code */
    country: Country | '';
};

/** Policy disabled fields */
type DisabledFields = {
    /** Whether the default billable field is disabled */
    defaultBillable?: boolean;

    /** Whether the reimbursable field is disabled */
    reimbursable?: boolean;
};

/** Policy tax rate */
type TaxRate = OnyxCommon.OnyxValueWithOfflineFeedback<{
    /** Name of the tax rate. */
    name: string;

    /** The value of the tax rate. */
    value: string;

    /** The code associated with the tax rate. If a tax is created in old dot, code field is undefined */
    code?: string;

    /** This contains the tax name and tax value as one name */
    modifiedName?: string;

    /** Indicates if the tax rate is disabled. */
    isDisabled?: boolean;

    /** An error message to display to the user */
    errors?: OnyxCommon.Errors;

    /** An error object keyed by field name containing errors keyed by microtime */
    errorFields?: OnyxCommon.ErrorFields;
}>;

/** Record of policy tax rates, indexed by id_{taxRateName} where taxRateName is the name of the tax rate in UPPER_SNAKE_CASE */
type TaxRates = Record<string, TaxRate>;

/** Policy tax rates with default tax rate */
type TaxRatesWithDefault = OnyxCommon.OnyxValueWithOfflineFeedback<{
    /** Name of the tax */
    name: string;

    /** Default policy tax code */
    defaultExternalID: string;

    /** Default value of taxes */
    defaultValue: string;

    /** Default foreign policy tax code */
    foreignTaxDefault: string;

    /** List of tax names and values */
    taxes: TaxRates;

    /** An error message to display to the user */
    errors?: OnyxCommon.Errors;

    /** Error objects keyed by field name containing errors keyed by microtime */
    errorFields?: OnyxCommon.ErrorFields;
}>;

/** Connection last synchronization state */
type ConnectionLastSync = {
    /** Date when the connection's last successful sync occurred */
    successfulDate?: string;

    /** Date when the connection's last failed sync occurred */
    errorDate?: string;

    /** Whether the connection's last sync was successful */
    isSuccessful: boolean;

    /** Where did the connection's last sync came from */
    source: 'DIRECT' | 'EXPENSIFYWEB' | 'EXPENSIFYAPI' | 'AUTOSYNC' | 'AUTOAPPROVE';
};

/** Financial account (bank account, debit card, etc) */
type Account = {
    /** GL code assigned to the financial account */
    glCode?: string;

    /** Name of the financial account */
    name: string;

    /** Currency of the financial account */
    currency: string;

    /** ID assigned to the financial account */
    id: string;
};

/** Model of QuickBooks Online employee data */
type Employee = {
    /** ID assigned to the employee */
    id: string;

    /** Employee's first name */
    firstName?: string;

    /** Employee's last name */
    lastName?: string;

    /** Employee's display name */
    name: string;

    /** Employee's e-mail */
    email: string;
};

/** Model of QuickBooks Online vendor data */
type Vendor = {
    /** ID assigned to the vendor */
    id: string;

    /** Vendor's name */
    name: string;

    /** Vendor's currency */
    currency: string;

    /** Vendor's e-mail */
    email: string;
};

/** Model of QuickBooks Online tax code data */
type TaxCode = {
    /** TODO: Not used in app */
    totalTaxRateVal: string;

    /** TODO: Not used in app */
    simpleName: string;

    /** TODO: Not used in app */
    taxCodeRef: string;

    /** TODO: Not used in app */
    taxRateRefs: Record<string, string>;

    /** TODO: Not used in app */
    /** Name of the tax code */
    name: string;
};

/**
 * Data imported from QuickBooks Online.
 */
type QBOConnectionData = {
    /** TODO: I think this value can be changed to `ValueOf<CONST.COUNTRY>` */
    /** Country code */
    country: string;

    /** TODO: Doesn't exist in the app */
    edition: string;

    /** TODO: Doesn't exist in the app */
    homeCurrency: string;

    /** TODO: Doesn't exist in the app */
    isMultiCurrencyEnabled: boolean;

    /** Collection of journal entry accounts  */
    journalEntryAccounts: Account[];

    /** Collection of bank accounts */
    bankAccounts: Account[];

    /** Collection of credit cards */
    creditCards: Account[];

    /** Collection of export destination accounts */
    accountsReceivable: Account[];

    /** TODO: Not enough context */
    accountPayable: Account[];

    /** TODO: Not enough context */
    otherCurrentAssetAccounts: Account[];

    /** TODO: Doesn't exist in the app */
    taxCodes: TaxCode[];

    /** TODO: Doesn't exist in the app */
    employees: Employee[];

    /** Collections of vendors */
    vendors: Vendor[];
};

/** Sync entity names */
type IntegrationEntityMap = (typeof CONST.INTEGRATION_ENTITY_MAP_TYPES)[keyof typeof CONST.INTEGRATION_ENTITY_MAP_TYPES];

/** Non reimbursable account types exported from QuickBooks Online */
type QBONonReimbursableExportAccountType = (typeof CONST.QUICKBOOKS_NON_REIMBURSABLE_EXPORT_ACCOUNT_TYPE)[keyof typeof CONST.QUICKBOOKS_NON_REIMBURSABLE_EXPORT_ACCOUNT_TYPE];

/** Reimbursable account types exported from QuickBooks Online */
type QBOReimbursableExportAccountType = (typeof CONST.QUICKBOOKS_REIMBURSABLE_ACCOUNT_TYPE)[keyof typeof CONST.QUICKBOOKS_REIMBURSABLE_ACCOUNT_TYPE];

/**
 * User configuration for the QuickBooks Online accounting integration.
 */
type QBOConnectionConfig = OnyxCommon.OnyxValueWithOfflineFeedback<{
    /** TODO: Doesn't exist in the app */
    /** ID of the QuickBooks Online realm */
    realmId: string;

    /** TODO: Doesn't exist in the app */
    /** Company name */
    companyName: string;

    /** Configuration of automatic synchronization from QuickBooks Online to the app */
    autoSync: {
        /** TODO: Doesn't exist in the app */
        jobID: string;

        /** Whether changes made in QuickBooks Online should be reflected into the app automatically */
        enabled: boolean;
    };

    /** Whether employees can be invited */
    syncPeople: boolean;

    /** TODO: Doesn't exist in the app */
    syncItems: boolean;

    /** TODO: Doesn't exist in the app */
    markChecksToBePrinted: boolean;

    /** Defines how reimbursable expenses are exported */
    reimbursableExpensesExportDestination: QBOReimbursableExportAccountType;

    /** Defines how non reimbursable expenses are exported */
    nonReimbursableExpensesExportDestination: QBONonReimbursableExportAccountType;

    /** Default vendor of non reimbursable bill */
    nonReimbursableBillDefaultVendor: string;

    /** ID of the invoice collection account */
    collectionAccountID?: string;

    /** ID of the bill payment account */
    reimbursementAccountID?: string;

    /** Account that receives the reimbursable expenses */
    reimbursableExpensesAccount?: Account;

    /** Account that receives the non reimbursable expenses */
    nonReimbursableExpensesAccount?: Account;

    /** Account that receives the exported invoices */
    receivableAccount?: Account;

    /**
     * Whether a default vendor will be created and applied to all credit card
     * transactions upon import
     */
    autoCreateVendor: boolean;

    /** TODO: Doesn't exist in the app */
    hasChosenAutoSyncOption: boolean;

    /** Whether Quickbooks Online classes should be imported */
    syncClasses: IntegrationEntityMap;

    /** Whether Quickbooks Online customers should be imported */
    syncCustomers: IntegrationEntityMap;

    /** Whether Quickbooks Online locations should be imported */
    syncLocations: IntegrationEntityMap;

    /** TODO: Doesn't exist in the app */
    lastConfigurationTime: number;

    /** Whether the taxes should be synchronized */
    syncTax: boolean;

    /** Whether new categories are enabled in chart of accounts */
    enableNewCategories: boolean;

    /** TODO: Doesn't exist in the app */
    errors?: OnyxCommon.Errors;

    /** TODO: Doesn't exist in the app */
    exportDate: ValueOf<typeof CONST.QUICKBOOKS_EXPORT_DATE>;

    /** Configuration of the export */
    export: {
        /** E-mail of the exporter */
        exporter: string;
    };

    /** Collections of form field errors */
    errorFields?: OnyxCommon.ErrorFields;
}>;

/** Xero bill status values */
type BillStatusValues = 'DRAFT' | 'AWT_APPROVAL' | 'AWT_PAYMENT';

/** Xero expense status values */
type ExpenseTypesValues = 'BILL' | 'BANK_TRANSACTION' | 'SALES_INVOICE' | 'NOTHING';

/** Xero bill date values */
type BillDateValues = 'REPORT_SUBMITTED' | 'REPORT_EXPORTED' | 'LAST_EXPENSE';

/** Model of an organization in Xero */
type Tenant = {
    /** ID of the organization */
    id: string;

    /** Name of the organization */
    name: string;

    /** TODO: Doesn't exist in the app */
    value: string;
};

/**
 * Data imported from Xero
 */
type XeroConnectionData = {
    /** Collection of bank accounts */
    bankAccounts: Account[];

    /** TODO: Doesn't exist in the app */
    countryCode: string;

    /** TODO: Doesn't exist in the app */
    organisationID: string;

    /** TODO: Doesn't exist in the app */
    revenueAccounts: Array<{
        id: string;
        name: string;
    }>;

    /** Collection of organizations */
    tenants: Tenant[];

    /** TODO: Doesn't exist in the app */
    trackingCategories: unknown[];
};

/**
 * User configuration for the Xero accounting integration.
 */
type XeroConnectionConfig = OnyxCommon.OnyxValueWithOfflineFeedback<{
    /** Xero auto synchronization configs */
    autoSync: {
        /** Whether data should be automatically synched between the app and Xero */
        enabled: boolean;

        /** TODO: Doesn't exist in the app */
        jobID: string;
    };

    /** TODO: Doesn't exist in the app */
    enableNewCategories: boolean;

    /** Xero export configs */
    export: {
        /** Current bill status */
        billDate: BillDateValues;

        billStatus: {
            /** Current status of the purchase bill */
            purchase: BillStatusValues;

            /** Current status of the sales bill */
            sales: BillStatusValues;
        };

        /** TODO: Doesn't exist in the app */
        billable: ExpenseTypesValues;

        /** The e-mail of the exporter */
        exporter: string;

        /** TODO: Doesn't exist in the app */
        nonReimbursable: ExpenseTypesValues;

        /** TODO: Doesn't exist in the app */
        nonReimbursableAccount: string;

        /** TODO: Doesn't exist in the app */
        reimbursable: ExpenseTypesValues;
    };

    /** Whether customers should be imported from Xero */
    importCustomers: boolean;

    /** Whether tax rates should be imported from Xero */
    importTaxRates: boolean;

    /** Whether tracking categories should be imported from Xero */
    importTrackingCategories: boolean;

    /** TODO: Doesn't exist in the app */
    isConfigured: boolean;

    /** TODO: Doesn't exist in the app */
    mappings: {
        customer: string;
    };
    sync: {
        /** TODO: Doesn't exist in the app */
        hasChosenAutoSyncOption: boolean;

        /** TODO: Doesn't exist in the app */
        hasChosenSyncReimbursedReportsOption: boolean;

        /** ID of the bank account for Xero invoice collections */
        invoiceCollectionsAccountID: string;

        /** TODO: Doesn't exist in the app */
        reimbursementAccountID: string;

        /** TODO: Doesn't exist in the app */
        syncReimbursedReports: boolean;
    };

    /** ID of Xero organization */
    tenantID: string;

    /** TODO: Doesn't exist in the app */
    errors?: OnyxCommon.Errors;

    /** Collection of form field errors  */
    errorFields?: OnyxCommon.ErrorFields;
}>;

/** State of integration connection */
type Connection<ConnectionData, ConnectionConfig> = {
    /** TODO: Doesn't exist in the app */
    /** State of the last synchronization */
    lastSync?: ConnectionLastSync;

    /** Data imported from integration */
    data: ConnectionData;

    /** Configuration of the connection */
    config: ConnectionConfig;
};

/** Available integration connections */
type Connections = {
    /** QuickBooks integration connection */
    quickbooksOnline: Connection<QBOConnectionData, QBOConnectionConfig>;

    /** Xero integration connection */
    xero: Connection<XeroConnectionData, XeroConnectionConfig>;
};

/** Names of integration connections */
type ConnectionName = keyof Connections;

/** Model of verified reimbursement bank account linked to policy */
type ACHAccount = {
    /** ID of the bank account */
    bankAccountID: number;

    /** Bank account number */
    accountNumber: string;

    /** Routing number of bank account */
    routingNumber: string;

    /** Address name of the bank account */
    addressName: string;

    /** Name of the bank */
    bankName: string;

    /** E-mail of the reimburser */
    reimburser: string;
};

/** Day of the month to schedule submission  */
type AutoReportingOffset = number | ValueOf<typeof CONST.POLICY.AUTO_REPORTING_OFFSET>;

/** Types of policy report fields */
type PolicyReportFieldType = 'text' | 'date' | 'dropdown' | 'formula';

/** Model of policy report field */
type PolicyReportField = {
    /** Name of the field */
    name: string;

    /** Default value assigned to the field */
    defaultValue: string;

    /** Unique id of the field */
    fieldID: string;

    /** Position at which the field should show up relative to the other fields */
    orderWeight: number;

    /** Type of report field */
    type: PolicyReportFieldType;

    /** Tells if the field is required or not */
    deletable: boolean;

    /** Value of the field */
    value: string | null;

    /** Options to select from if field is of type dropdown */
    values: string[];

    /** TODO: Doesn't seem to be used in app */
    target: string;

    /** Tax UDFs have keys holding the names of taxes (eg, VAT), values holding percentages (eg, 15%) and a value indicating the currently selected tax value (eg, 15%). */
    keys: string[];

    /** list of externalIDs, this are either imported from the integrations or auto generated by us, each externalID */
    externalIDs: string[];

    /** Collection of flags that state whether droplist field options are disabled */
    disabledOptions: boolean[];

    /** Is this a tax user defined report field */
    isTax: boolean;

    /** This is the selected externalID in an expense. */
    externalID?: string | null;

    /** Automated action or integration that added this report field */
    origin?: string | null;

    /** This is indicates which default value we should use. It was preferred using this over having defaultValue (which we have anyway for historical reasons), since the values are not unique we can't determine which key the defaultValue is referring too. It was also preferred over having defaultKey since the keys are user editable and can be changed. The externalIDs work effectively as an ID, which never changes even after changing the key, value or position of the option. */
    defaultExternalID?: string | null;
};

/** Names of policy features */
type PolicyFeatureName = ValueOf<typeof CONST.POLICY.MORE_FEATURES>;

/** Current user policy join request state */
type PendingJoinRequestPolicy = {
    /** Whether the current user requested to join the policy */
    isJoinRequestPending: boolean;

    /** Record of public policy details, indexed by policy ID */
    policyDetailsForNonMembers: Record<
        string,
        OnyxCommon.OnyxValueWithOfflineFeedback<{
            /** Name of the policy */
            name: string;

            /** Policy owner account ID */
            ownerAccountID: number;

            /** Policy owner e-mail */
            ownerEmail: string;

            /** Policy type */
            type: ValueOf<typeof CONST.POLICY.TYPE>;

            /** Policy avatar */
            avatar?: string;
        }>
    >;
};

/** Model of policy data */
type Policy = OnyxCommon.OnyxValueWithOfflineFeedback<
    {
        /** The ID of the policy */
        id: string;

        /** The name of the policy */
        name: string;

        /** The current user's role in the policy */
        role: ValueOf<typeof CONST.POLICY.ROLE>;

        /** The policy type */
        type: ValueOf<typeof CONST.POLICY.TYPE>;

        /** The email of the policy owner */
        owner: string;

        /** The accountID of the policy owner */
        ownerAccountID?: number;

        /** The output currency for the policy */
        outputCurrency: string;

        /** The address of the company */
        address?: CompanyAddress;

        /** The URL for the policy avatar */
        avatarURL?: string;

        /** Error objects keyed by field name containing errors keyed by microtime */
        errorFields?: OnyxCommon.ErrorFields;

        /** A list of errors keyed by microtime */
        errors?: OnyxCommon.Errors;

        /** Whether this policy was loaded from a policy summary, or loaded completely with all of its values */
        isFromFullPolicy?: boolean;

        /** When this policy was last modified */
        lastModified?: string;

        /** The custom units data for this policy */
        customUnits?: Record<string, CustomUnit>;

        /** Whether policy expense chats can be created and used on this policy. Enabled manually by CQ/JS snippet. Always true for free policies. */
        isPolicyExpenseChatEnabled: boolean;

        /** Whether the auto reporting is enabled */
        autoReporting?: boolean;

        /** The scheduled submit frequency set up on this policy */
        autoReportingFrequency?: ValueOf<typeof CONST.POLICY.AUTO_REPORTING_FREQUENCIES>;

        /** Whether the scheduled submit is enabled */
        harvesting?: {
            enabled: boolean;
        };

        /** Whether the self approval or submitting is enabled */
        preventSelfApproval?: boolean;

        /** When the monthly scheduled submit should happen */
        autoReportingOffset?: AutoReportingOffset;

        /** The accountID of manager who the employee submits their expenses to on paid policies */
        submitsTo?: number;

        /** The employee list of the policy */
        employeeList?: OnyxTypes.PolicyEmployeeList;

        /** The reimbursement choice for policy */
        reimbursementChoice?: ValueOf<typeof CONST.POLICY.REIMBURSEMENT_CHOICES>;

        /** The maximum report total allowed to trigger auto reimbursement. */
        autoReimbursementLimit?: number;

        /** Whether to leave the calling account as an admin on the policy */
        makeMeAdmin?: boolean;

        /** Original file name which is used for the policy avatar */
        originalFileName?: string;

        /** Alert message for the policy */
        alertMessage?: string;

        /** Informative messages about which policy members were added with primary logins when invited with their secondary login */
        primaryLoginsInvited?: Record<string, string>;

        /** Whether policy is updating */
        isPolicyUpdating?: boolean;

        /** The approver of the policy */
        approver?: string;

        /** The approval mode set up on this policy */
        approvalMode?: ValueOf<typeof CONST.POLICY.APPROVAL_MODE>;

        /** Whether transactions should be billable by default */
        defaultBillable?: boolean;

        /** The workspace description */
        description?: string;

        /** List of field names that are disabled */
        disabledFields?: DisabledFields;

        /** Whether new transactions need to be tagged */
        requiresTag?: boolean;

        /** Whether new transactions need to be categorized */
        requiresCategory?: boolean;

        /** Whether the workspace has multiple levels of tags enabled */
        hasMultipleTagLists?: boolean;

        /**
         * Whether or not the policy has tax tracking enabled
         *
         * @deprecated - use tax.trackingEnabled instead
         */
        isTaxTrackingEnabled?: boolean;

        /** Whether or not the policy has tax tracking enabled */
        tax?: {
            trackingEnabled: boolean;
        };

        /** Collection of tax rates attached to a policy */
        taxRates?: TaxRatesWithDefault;

        /** ReportID of the admins room for this workspace */
        chatReportIDAdmins?: number;

        /** ReportID of the announce room for this workspace */
        chatReportIDAnnounce?: number;

        /** All the integration connections attached to the policy */
        connections?: Connections;

        /** Report fields attached to the policy */
        fieldList?: Record<string, PolicyReportField>;

        /** Whether the Categories feature is enabled */
        areCategoriesEnabled?: boolean;

        /** Whether the Tags feature is enabled */
        areTagsEnabled?: boolean;

        /** Whether the Accounting feature is enabled */
        areAccountingEnabled?: boolean;

        /** Whether the Distance Rates feature is enabled */
        areDistanceRatesEnabled?: boolean;

        /** Whether the workflows feature is enabled */
        areWorkflowsEnabled?: boolean;

        /** Whether the Report Fields feature is enabled */
        areReportFieldsEnabled?: boolean;

        /** Whether the Connections feature is enabled */
        areConnectionsEnabled?: boolean;

        /** The verified bank account linked to the policy */
        achAccount?: ACHAccount;

        /** Indicates if the Policy is in loading state */
        isLoading?: boolean;

        /** Indicates if the Policy ownership change is successful */
        isChangeOwnerSuccessful?: boolean;

        /** Indicates if the Policy ownership change is failed */
        isChangeOwnerFailed?: boolean;

        /** Object containing all policy information necessary to connect with Spontana */
        travelSettings?: WorkspaceTravelSettings;
    } & Partial<PendingJoinRequestPolicy>,
    'generalSettings' | 'addWorkspaceRoom' | keyof ACHAccount
>;

/** Stages of policy connection sync */
type PolicyConnectionSyncStage = ValueOf<typeof CONST.POLICY.CONNECTIONS.SYNC_STAGE_NAME>;

/** Names of policy connection services */
type PolicyConnectionName = ValueOf<typeof CONST.POLICY.CONNECTIONS.NAME>;

/** Policy connection sync progress state */
type PolicyConnectionSyncProgress = {
    /** Current sync stage */
    stageInProgress: PolicyConnectionSyncStage;

    /** Name of the connected service */
    connectionName: PolicyConnectionName;
};

export default Policy;

export type {
    PolicyReportField,
    PolicyReportFieldType,
    Unit,
    CustomUnit,
    Attributes,
    Rate,
    TaxRate,
    TaxRates,
    TaxRatesWithDefault,
    CompanyAddress,
    IntegrationEntityMap,
    PolicyFeatureName,
    PendingJoinRequestPolicy,
    PolicyConnectionName,
    PolicyConnectionSyncStage,
    PolicyConnectionSyncProgress,
    Connections,
    ConnectionName,
    Tenant,
    Account,
    QBONonReimbursableExportAccountType,
    QBOReimbursableExportAccountType,
    QBOConnectionConfig,
};
