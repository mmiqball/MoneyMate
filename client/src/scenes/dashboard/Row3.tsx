import BoxHeader from '@/components/BoxHeader';
import DashboardBox from '@/components/DashboardBox'
import FlexBetween from '@/components/FlexBetween';
import { useGetKpisQuery, useGetProductsQuery, useGetTransactionsQuery } from '@/state/api'
import { Box, Typography, useTheme } from '@mui/material';
import { palette } from '@mui/system';
import { DataGrid, GridCellParams } from '@mui/x-data-grid';
import React, { useMemo } from 'react'
import { Cell, Pie, PieChart } from 'recharts';

const Row3 = () => {
  const { palette } = useTheme();
  const pieColors = [palette.primary[800], palette.primary[500]];
  const { data: kpiData } = useGetKpisQuery();
  const { data: productData } = useGetProductsQuery();
  const { data: transactionsData } = useGetTransactionsQuery();
  const pieData = useMemo(() => {
    if (kpiData) {
      const totalExpenses = kpiData[0].totalExpenses;
      return Object.entries(kpiData[0].expensesByCategory).map(
        ([key, value]: [string, number]) => {
          return [
            {
              name: key,
              value: value,
            },
            {
              name: `${key} of Total`,
              value: totalExpenses - value,
            }
          ];
        }
      );
    }
  }, [kpiData]);
  console.log(pieData);
  const productColumns = [
    {
      field: "_id",
      headerName: "id",
      flex: 1
    },
    {
      field: "expense",
      headerName: "Expense",
      flex: 0.5,
      renderCell: (params: GridCellParams) => `$${params.value}`,
    },
    {
      field: "price",
      headerName: "Price",
      flex: 0.5,
      renderCell: (params: GridCellParams) => `$${params.value}`,
    },
  ]
  const transactionsColumns = [
    {
      field: "_id",
      headerName: "id",
      flex: 1
    },
    {
      field: "buyer",
      headerName: "Buyer",
      flex: 0.67,
    },
    {
      field: "amount",
      headerName: "Amount",
      flex: 0.35,
      renderCell: (params: GridCellParams) => `$${params.value}`,
    },
    {
      field: "productIds",
      headerName: "Count",
      flex: 0.1,
      renderCell: (params: GridCellParams) => (params.value as Array<string>).length,
    },
  ]
  return (
    <>
        <DashboardBox gridArea="g">
          <BoxHeader
            title="Product List"
            sideText={`${productData?.length} products`}/>
          <Box mt="0.5rem" p="0 0.5rem" height="75%" sx={{
            "& .MuiDataGrid-root": {
              color: palette.grey[300],
              border: "none",
            }, "& .MuiDataGrid-cell": {
              borderBottom: `1px solid ${palette.grey[800]} !important`,
            }, "& .MuiDataGrid-columnHeaders": {
              borderBottom: `1px solid ${palette.grey[800]} !important`,
            }, "& .MuiDataGrid-columnSeparator": {
              visibility: "hidden",
            },
          }}>
            <DataGrid 
              columnHeaderHeight={25}
              rowHeight={35}
              hideFooter={true}
              rows={productData || []}
              columns={productColumns}/>
          </Box>
          
        </DashboardBox>
        <DashboardBox gridArea="h">
        <BoxHeader
            title="Recent Orders"
            sideText={`${transactionsData?.length} orders`}/>
          <Box mt="1rem" p="0 0.5rem" height="80%" sx={{
            "& .MuiDataGrid-root": {
              color: palette.grey[300],
              border: "none",
            }, "& .MuiDataGrid-cell": {
              borderBottom: `1px solid ${palette.grey[800]} !important`,
            }, "& .MuiDataGrid-columnHeaders": {
              borderBottom: `1px solid ${palette.grey[800]} !important`,
            }, "& .MuiDataGrid-columnSeparator": {
              visibility: "hidden",
            },
          }}>
            <DataGrid 
              columnHeaderHeight={25}
              rowHeight={35}
              hideFooter={true}
              rows={transactionsData || []}
              columns={transactionsColumns}/>
          </Box>
        </DashboardBox>
        <DashboardBox gridArea="i">
          <BoxHeader title="Expenses by Category" sideText="+4%" />
          <FlexBetween mt="0.5rem" gap="0.5rem" p="0 1rem" textAlign="center">
            {pieData?.map((data, i) => (
            <Box key={`${data[0].name}-${i}`}>
              <PieChart 
                width={110} 
                height={100}>
                  <Pie
                    stroke="none"
                    data={data}
                    innerRadius={18}
                    outerRadius={35}
                    paddingAngle={2}
                    dataKey="value"
                  >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={pieColors[index]} />
                  ))}
                  </Pie>
              </PieChart>
              <Typography variant="h5">{data[0].name}</Typography>
            </Box>
            ))}
          </FlexBetween>
        </DashboardBox>
        <DashboardBox gridArea="j">
          <BoxHeader title="Summary" sideText='+15%' />
          <Box height="15px" margin="1.25rem 1rem 0.4rem 1rem" bgcolor={palette.primary[800]} borderRadius="1rem">
            <Box height="15px" bgcolor={palette.primary[600]} borderRadius="1rem" width="40%">
            </Box>
          </Box>
          <Typography variant="h6" margin="0 1rem">
          According to the financial statements of XYZ Corporation, the company 
          generated a total revenue of $283,000 and a total profit of $212,000 
          for the fiscal year. Our data suggests that XYZ had a successful year with strong revenue growth
          and a high profit margin. 
          </Typography>
        </DashboardBox>
    </>
  )
}

export default Row3