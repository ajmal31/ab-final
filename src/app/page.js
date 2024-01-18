"use client"
import Table from './components/table/page'
import { AppProvider } from '@shopify/polaris'
export default function Home() {
  return (
    <AppProvider>
      <Table></Table>
    </AppProvider>




  )
}
