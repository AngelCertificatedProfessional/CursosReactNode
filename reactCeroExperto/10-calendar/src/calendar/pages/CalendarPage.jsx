import { Calendar } from 'react-big-calendar'
import 'react-big-calendar/lib/css/react-big-calendar.css'
import { addHours } from 'date-fns'
import { CalendarEvent, CalendarModal, Navbar } from "../"
import { localizer,getMessagesEs } from '../../helpers'
import { useState } from 'react'
import { useUiStore } from '../../hooks'

const events = [{
  title: 'Cumpleaños del Jefe',
  notes: 'Hay que comprar el pastel',
  start: new Date(),
  end:addHours(new Date(),2), //le sumamos 2 horas
  bgColor: '#fafafa',
  user:{
    id:123,
    name:'Fernando'
  }
}]

export const CalendarPage = () => {
  const { openDateModal} = useUiStore()
  const [lastView,setLastView] = useState(localStorage.getItem('lastView') || 'week')

  const eventyStyleGetter = (event,start,end,isSelected) => {
    const style = {
      backgroundColor: '#347CF7',
      borderRadius:'0px',
      opacity:0.8,
      color:'white'
    }
    return {style}
  }

  const onDoubleClick = (event) =>{
    openDateModal();
  }
  const onViewChanged = (event) =>{
    localStorage.setItem('lastView',event)
    setLastView(event)
  }

  const onSelect = (event) =>{
    console.log({click:event})
  }



  return (
    <>

      <Navbar/>
      <Calendar
        culture='es'
        localizer={localizer}
        events={events}
        defaultView={lastView}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 'calc(100vh - 80px)' }}
        messages={getMessagesEs()}
        eventPropGetter={eventyStyleGetter}
        components={{
          event:CalendarEvent
        }}
        onDoubleClickEvent={onDoubleClick}
        onSelectEvent={onSelect}
        onView={onViewChanged}
      />
      <CalendarModal/>
    </>

  )
}