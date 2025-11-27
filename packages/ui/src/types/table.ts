// 基础数据类型
export interface TableColumn<T> {
  key: keyof T;
  title: string;
  width?: number | string;
  sortable?: boolean;
  filterable?: boolean;
  render?: (value: T[keyof T], record: T, index: number) => React.ReactNode;
  sorter?: (a: T, b: T) => number;
}

export interface PaginationConfig {
  current?: number;
  pageSize?: number;
  total?: number;
  showSizeChanger?: boolean;
  pageSizeOptions?: number[];
  showQuickJumper?: boolean;
  showTotal?: boolean;
  onChange?: (page: number, pageSize: number) => void;
}

export interface RowSelectionConfig<T> {
  type: 'checkbox' | 'radio';
  selectedRowKeys?: string[];
  onChange?: (selectedRowKeys: string[], selectedRows: T[]) => void;
  getCheckboxProps?: (record: T) => { disabled?: boolean };
}

export interface ExpandableConfig<T> {
  expandedRowRender: (record: T) => React.ReactNode;
  expandedRowKeys?: string[];
  onExpand?: (expanded: boolean, record: T) => void;
}

export interface TableProps<T> {
  dataSource: T[];
  columns: TableColumn<T>[];
  loading?: boolean;
  pagination?: PaginationConfig | false;
  rowKey?: keyof T | ((record: T) => string);
  rowSelection?: RowSelectionConfig<T>;
  expandable?: ExpandableConfig<T>;
  onRowClick?: (record: T, index: number) => void;
  onSortChange?: (field: keyof T | null, order: 'asc' | 'desc' | null) => void;
  className?: string;
  style?: React.CSSProperties;
  size?: 'small' | 'medium' | 'large';
  bordered?: boolean;
  striped?: boolean;
}
