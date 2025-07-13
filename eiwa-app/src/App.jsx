import { useState } from 'react'
import Layout from './components/Layout'
import SearchPage from './components/SearchPage'
import HostDashboard from './components/HostDashboard'
import AddAccommodation from './components/AddAccommodation'

function App() {
  const [currentPage, setCurrentPage] = useState('search')
  const [userType, setUserType] = useState('visitor') // 'visitor' or 'host'

  const handlePageChange = (page) => {
    setCurrentPage(page)
  }

  const handleUserTypeChange = (type) => {
    setUserType(type)
    if (type === 'visitor') {
      setCurrentPage('search')
    } else {
      setCurrentPage('dashboard')
    }
  }

  const handleAddAccommodation = () => {
    setCurrentPage('add')
  }

  const handleBackFromAdd = () => {
    setCurrentPage('dashboard')
  }

  const handleSaveAccommodation = (accommodationData) => {
    console.log('حفظ مكان الإيواء:', accommodationData)
    // هنا يمكن إرسال البيانات إلى الخادم
    setCurrentPage('dashboard')
  }

  const renderContent = () => {
    switch (currentPage) {
      case 'search':
        return <SearchPage />
      case 'dashboard':
        return <HostDashboard onAddAccommodation={handleAddAccommodation} />
      case 'add':
        return <AddAccommodation onSave={handleSaveAccommodation} onBack={handleBackFromAdd} />
      default:
        return <SearchPage />
    }
  }

  return (
    <Layout 
      currentPage={currentPage} 
      onPageChange={handlePageChange}
      userType={userType}
      onUserTypeChange={handleUserTypeChange}
    >
      {renderContent()}
    </Layout>
  )
}

export default App
