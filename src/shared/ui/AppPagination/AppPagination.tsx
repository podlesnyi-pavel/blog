import { Pagination, PaginationProps, ConfigProvider } from 'antd';
import './AppPagination.scss';
import stylesVar from '@/app/styles/variables.module.scss';

import { FC } from 'react';

const AppPagination: FC<PaginationProps> = ({
  current,
  defaultPageSize,
  total,
  defaultCurrent = 1,
  align,
  showSizeChanger,
  onChange,
}) => {
  return (
    <ConfigProvider
      theme={{
        components: {
          Pagination: {
            itemActiveBg: stylesVar.primaryColor,
            itemBg: 'transparent',
            itemSize: 22,
          },
        },
      }}
    >
      <Pagination
        current={current}
        defaultPageSize={defaultPageSize}
        defaultCurrent={defaultCurrent}
        total={total}
        align={align}
        showSizeChanger={showSizeChanger}
        onChange={onChange}
      />
    </ConfigProvider>
  );
};

export default AppPagination;
