export type SecurityRuleContext = {
    path: string;
    operation: 'get' | 'list' | 'create' | 'update' | 'delete' | 'write';
    requestResourceData?: any;
  };
  
  export class FirestorePermissionError extends Error {
    public readonly context: SecurityRuleContext;
  
    constructor(context: SecurityRuleContext) {
      const prettyJson = JSON.stringify(context, null, 2);
      super(
        `Firestore Security Rules blocked a request at '${context.path}'.\nContext: ${prettyJson}`
      );
      this.name = 'FirestorePermissionError';
      this.context = context;
  
      // This is to ensure the stack trace is captured correctly
      if (Error.captureStackTrace) {
        Error.captureStackTrace(this, FirestorePermissionError);
      }
    }
  }
  