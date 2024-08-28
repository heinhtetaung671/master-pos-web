
export type MsgBottomSheetStatus = 'success' | 'error' | 'danger' | 'warning' | 'info';

export interface MsgBottomSheetData {
    status: MsgBottomSheetStatus, title: string, msg: any
}

export type YearlyMonthlyType = 'MONTHLY' | 'YEARLY';