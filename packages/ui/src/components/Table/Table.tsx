import React, { useState, useMemo, useEffect, useRef } from 'react';
import { useConfig } from '../../config';
import type { 
  TableProps, 
  TableColumn, 
  PaginationConfig, 
  RowSelectionConfig,
  ExpandableConfig 
} from '../../types/table';
import styles from './Table.module.css';
import '../../styles/variables.css';
import { Empty } from '../Empty';
import { withPrefix } from '../../config/classPrefix';

function Table<T extends Record<string, any>>({
  dataSource,
  columns,
  loading = false,
  pagination = false,
  rowKey,
  rowSelection,
  expandable,
  onRowClick,
  onSortChange,
  className = '',
  style,
  size = 'medium',
  bordered = false,
  striped = false
}: TableProps<T>) {
  const { locale } = useConfig();
  const [sortField, setSortField] = useState<keyof T | null>(null);
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc' | null>(null);
  const initialPage = typeof pagination === 'object' && pagination?.current ? pagination.current : 1;
  const initialPageSize = typeof pagination === 'object' && pagination?.pageSize ? pagination.pageSize : 10;
  const [currentPage, setCurrentPage] = useState(initialPage);
  const [pageSize, setPageSize] = useState(initialPageSize);
  const [selectedRowKeys, setSelectedRowKeys] = useState<string[]>(rowSelection?.selectedRowKeys || []);
  const [expandedRowKeys, setExpandedRowKeys] = useState<string[]>(expandable?.expandedRowKeys || []);

  // Dev warning for unstable row keys
  useEffect(() => {
    if (!rowKey) {
      // eslint-disable-next-line no-console
      console.warn('[Table] rowKey is not provided. Using index as key may be unstable when sorting/pagination.');
    }
  }, []);

  // Sync controlled props
  useEffect(() => {
    if (typeof pagination === 'object') {
      if (pagination.current && pagination.current !== currentPage) setCurrentPage(pagination.current);
      if (pagination.pageSize && pagination.pageSize !== pageSize) setPageSize(pagination.pageSize);
    }
  }, [pagination && (pagination as any).current, pagination && (pagination as any).pageSize]);

  useEffect(() => {
    if (rowSelection?.selectedRowKeys) setSelectedRowKeys(rowSelection.selectedRowKeys);
  }, [rowSelection && rowSelection.selectedRowKeys]);

  useEffect(() => {
    if (expandable?.expandedRowKeys) setExpandedRowKeys(expandable.expandedRowKeys);
  }, [expandable && expandable.expandedRowKeys]);

  // 排序逻辑
  const sortedData = useMemo(() => {
    if (!sortField || !sortOrder) return dataSource;
    
    const column = columns.find(col => col.key === sortField);
    const sorter = column?.sorter;
    
    return [...dataSource].sort((a, b) => {
      if (sorter) {
        return sortOrder === 'asc' ? sorter(a, b) : sorter(b, a);
      }
      
      const aValue = a[sortField];
      const bValue = b[sortField];
      
      if (aValue === bValue) return 0;
      
      if (aValue === null || aValue === undefined) return 1;
      if (bValue === null || bValue === undefined) return -1;
      
      if (typeof aValue === 'string' && typeof bValue === 'string') {
        return sortOrder === 'asc' 
          ? aValue.localeCompare(bValue)
          : bValue.localeCompare(aValue);
      }
      
      if (typeof aValue === 'number' && typeof bValue === 'number') {
        return sortOrder === 'asc' ? aValue - bValue : bValue - aValue;
      }
      
      return sortOrder === 'asc' 
        ? String(aValue).localeCompare(String(bValue))
        : String(bValue).localeCompare(String(aValue));
    });
  }, [dataSource, sortField, sortOrder, columns]);

  // 分页逻辑
  const paginatedData = useMemo(() => {
    if (!pagination) return sortedData;
    
    const startIndex = (currentPage - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    return sortedData.slice(startIndex, endIndex);
  }, [sortedData, currentPage, pageSize, pagination]);

  // 获取行键
  const getRowKey = (record: T, index: number): string => {
    if (rowKey) {
      if (typeof rowKey === 'function') {
        return rowKey(record);
      }
      return String(record[rowKey]);
    }
    return String(index);
  };

  // 处理排序
  const handleSort = (column: TableColumn<T>) => {
    if (!column.sortable) return;
    
    if (sortField === column.key) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : sortOrder === 'desc' ? null : 'asc');
      if (sortOrder === 'desc') {
        setSortField(null);
      }
    } else {
      setSortField(column.key);
      setSortOrder('asc');
    }
    // Emit sort change
    onSortChange?.(sortField === column.key ? sortField : column.key, sortField === column.key ? (sortOrder === 'asc' ? 'desc' : sortOrder === 'desc' ? null : 'asc') : 'asc');
  };

  // 处理行选择
  const handleRowSelect = (record: T, index: number) => {
    if (!rowSelection) return;
    
    const key = getRowKey(record, index);
    const newSelectedKeys = selectedRowKeys.includes(key)
      ? selectedRowKeys.filter(k => k !== key)
      : rowSelection.type === 'radio' 
        ? [key]
        : [...selectedRowKeys, key];
    
    setSelectedRowKeys(newSelectedKeys);
    rowSelection.onChange?.(newSelectedKeys, 
      newSelectedKeys.map(k => dataSource.find((item, i) => getRowKey(item, i) === k)).filter(Boolean) as T[]
    );
  };

  // 处理行展开
  const handleRowExpand = (record: T, index: number) => {
    if (!expandable) return;
    
    const key = getRowKey(record, index);
    const isExpanded = expandedRowKeys.includes(key);
    const newExpandedKeys = isExpanded
      ? expandedRowKeys.filter(k => k !== key)
      : [...expandedRowKeys, key];
    
    setExpandedRowKeys(newExpandedKeys);
    expandable.onExpand?.(!isExpanded, record);
  };

  // 处理分页变化
  const handlePageChange = (page: number, newPageSize?: number) => {
    setCurrentPage(page);
    if (newPageSize && newPageSize !== pageSize) {
      setPageSize(newPageSize);
      setCurrentPage(1);
    }
    if (pagination && typeof pagination === 'object') {
      pagination.onChange?.(page, newPageSize || pageSize);
    }
  };

  // 渲染表头
  const renderHeader = () => (
    <thead className={styles[withPrefix('table-header')]}> 
      <tr>
        {rowSelection && rowSelection.type === 'checkbox' && (
          <th className={styles[withPrefix('table-header-cell')]}> 
            <input
              type={rowSelection.type === 'radio' ? 'radio' : 'checkbox'}
              ref={(el) => {
                if (!el) return;
                const selectableKeys = dataSource
                  .map((rec, idx) => ({ rec, idx }))
                  .filter(({ rec }) => !rowSelection.getCheckboxProps?.(rec)?.disabled)
                  .map(({ rec, idx }) => getRowKey(rec, idx));
                const isIndeterminate = selectedRowKeys.length > 0 && selectedRowKeys.length < selectableKeys.length;
                el.indeterminate = isIndeterminate;
              }}
              checked={(function(){
                const selectableKeys = dataSource
                  .map((rec, idx) => ({ rec, idx }))
                  .filter(({ rec }) => !rowSelection.getCheckboxProps?.(rec)?.disabled)
                  .map(({ rec, idx }) => getRowKey(rec, idx));
                return selectedRowKeys.length === selectableKeys.length && selectableKeys.length > 0;
              })()}
              onChange={(e) => {
                if (e.target.checked) {
                  const allKeys = dataSource
                    .map((rec, idx) => ({ rec, idx }))
                    .filter(({ rec }) => !rowSelection.getCheckboxProps?.(rec)?.disabled)
                    .map(({ rec, idx }) => getRowKey(rec, idx));
                  setSelectedRowKeys(allKeys);
                  rowSelection.onChange?.(allKeys, dataSource);
                } else {
                  setSelectedRowKeys([]);
                  rowSelection.onChange?.([], []);
                }
              }}
            />
          </th>
        )}
        {expandable && <th className={styles[withPrefix('table-header-cell')]}></th>}
        {columns.map((column) => (
          <th
            key={String(column.key)}
            className={`${styles[withPrefix('table-header-cell')]} ${column.sortable ? styles[withPrefix('sortable')] : ''} ${
              sortField === column.key ? (sortOrder === 'asc' ? styles[withPrefix('asc')] : styles[withPrefix('desc')]) : ''
            }`}
            style={{ width: column.width }}
            onClick={() => handleSort(column)}
            aria-sort={sortField === column.key ? (sortOrder === 'asc' ? 'ascending' : 'descending') : 'none'}
          >
            {column.title}
          </th>
        ))}
      </tr>
    </thead>
  );

  // 渲染表格行
  const renderRow = (record: T, index: number) => {
    const key = getRowKey(record, index);
    const isSelected = selectedRowKeys.includes(key);
    const isExpanded = expandedRowKeys.includes(key);

    return (
      <React.Fragment key={key}>
        <tr
          className={`${styles[withPrefix('table-row')]} ${striped ? styles[withPrefix('striped')] : ''} ${
            isSelected ? styles[withPrefix('selected')] : ''
          }`}
          onClick={() => onRowClick?.(record, index)}
        >
          {rowSelection && (
            <td className={styles[withPrefix('table-cell')]}> 
              <input
                type={rowSelection.type === 'radio' ? 'radio' : 'checkbox'}
                checked={isSelected}
                onChange={() => handleRowSelect(record, index)}
                disabled={rowSelection.getCheckboxProps?.(record)?.disabled}
              />
            </td>
          )}
          {expandable && (
            <td className={styles[withPrefix('table-cell')]}> 
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleRowExpand(record, index);
                }}
                style={{
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  transform: isExpanded ? 'rotate(90deg)' : 'rotate(0deg)',
                  transition: 'transform 0.2s'
                }}
                aria-expanded={isExpanded}
                aria-label={isExpanded ? 'Collapse row' : 'Expand row'}
              >
                ▶
              </button>
            </td>
          )}
          {columns.map((column) => (
            <td key={String(column.key)} className={styles[withPrefix('table-cell')]}> 
              {column.render
                ? column.render(record[column.key], record, index)
                : String(record[column.key] ?? '')}
            </td>
          ))}
        </tr>
        {expandable && isExpanded && (
          <tr>
            <td colSpan={columns.length + (rowSelection ? 1 : 0) + (expandable ? 1 : 0)} 
                className={styles[withPrefix('table-cell')]}> 
              {expandable.expandedRowRender(record)}
            </td>
          </tr>
        )}
      </React.Fragment>
    );
  };

  // 渲染分页
  const renderPagination = () => {
    if (!pagination) return null;
    
    const total = pagination.total || sortedData.length;
    const totalPages = Math.ceil(total / pageSize);
    const showSizeChanger = pagination.showSizeChanger !== false;
    const pageSizeOptions = pagination.pageSizeOptions || [10, 20, 50, 100];

    return (
      <div className={styles[withPrefix('pagination')]}> 
        <button
          className={`${styles[withPrefix('pagination-item')]} ${currentPage === 1 ? styles[withPrefix('disabled')] : ''}`}
          onClick={() => currentPage > 1 && handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          {locale.table.pagination.prev}
        </button>
        
        {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
          let pageNum;
          if (totalPages <= 5) {
            pageNum = i + 1;
          } else if (currentPage <= 3) {
            pageNum = i + 1;
          } else if (currentPage >= totalPages - 2) {
            pageNum = totalPages - 4 + i;
          } else {
            pageNum = currentPage - 2 + i;
          }
          
          return (
          <button
            key={pageNum}
            className={`${styles[withPrefix('pagination-item')]} ${currentPage === pageNum ? styles[withPrefix('active')] : ''}`}
            onClick={() => handlePageChange(pageNum)}
          >
            {pageNum}
          </button>
          );
        })}
        
        <button
          className={`${styles[withPrefix('pagination-item')]} ${currentPage === totalPages ? styles[withPrefix('disabled')] : ''}`}
          onClick={() => currentPage < totalPages && handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          {locale.table.pagination.next}
        </button>
        
        {showSizeChanger && (
          <select
            className={styles[withPrefix('pagination-item')]}
            value={pageSize}
            onChange={(e) => handlePageChange(1, Number(e.target.value))}
          >
            {pageSizeOptions.map(size => (
              <option key={size} value={size}>{size} / page</option>
            ))}
          </select>
        )}
        
        {pagination.showTotal && (
          <span className={styles[withPrefix('pagination-item')]} style={{ cursor: 'default' }}>
            {total} {locale.table.pagination.items}
          </span>
        )}
      </div>
    );
  };

  const tableClasses = `${styles[withPrefix('table')]} ${styles[withPrefix(`table-${size}`)]} ${
    bordered ? styles[withPrefix('table-bordered')] : ''
  } ${loading ? styles[withPrefix('table-loading')] : ''} ${className}`.trim();

  return (
    <div style={style}>
      <table className={tableClasses}>
        {renderHeader()}
        <tbody className={styles[withPrefix('table-body')]}> 
          {loading && (
            <tr>
              <td colSpan={columns.length + (rowSelection ? 1 : 0) + (expandable ? 1 : 0)} 
                  style={{ textAlign: 'center', padding: '40px' }}>
                <div className={styles[withPrefix('loading-spinner')]}></div>
              </td>
            </tr>
          )}
          {!loading && paginatedData.map((record, index) => renderRow(record, index))}
          {!loading && paginatedData.length === 0 && (
            <tr>
              <td
                colSpan={columns.length + (rowSelection ? 1 : 0) + (expandable ? 1 : 0)}
                style={{ padding: '40px' }}
              >
                <Empty>{locale.table.noData}</Empty>
              </td>
            </tr>
          )}
        </tbody>
      </table>
      {renderPagination()}
    </div>
  );
}

export default Table;
