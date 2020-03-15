import React, { useCallback, useState, useEffect, CSSProperties } from "react";
import { RouteComponentProps } from "@reach/router";
import { useTrip } from "src/Providers/Trips";
import * as BigCalendar from "react-big-calendar";
import { View } from "react-big-calendar";
import { CalendarTripLegs, CalendarDay } from "@dimelo/itinerary";
import moment from "moment";
import NewActivityModal from "./Modals/NewActivity.modal";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { ReactComponent as SearchIcon } from "src/shared/assets/search.svg";
import { ReactComponent as AddActivityIcon } from "src/shared/assets/add-activity.svg";
import { ReactComponent as CalendarMenu } from "src/shared/assets/calendar-menu.svg";
import Calendar from "react-calendar";
import "./style.css";
import { useDashboardOverview } from "src/Providers/DashboardOverview";
import { ReactComponent as ArrowLeftIcon } from "src/shared/assets/calendar-arrow-left.svg";
import { ReactComponent as ArrowRightIcon } from "src/shared/assets/calendar-arrow-right.svg";
import {
  AddActivityButton,
  FilterDiv,
  TextPara,
  FilterInput,
  RadiobuttonTextTd
} from "./Itinerary.styled";
import useApi from "src/shared/hooks/useApi";
import { useMediaQuery } from "src/shared/hooks/useMediaQuery";
import DayPicker, { LocaleUtils } from "react-day-picker";
import { DatePickerStyledWithoutBorder } from "src/Components/Calendar/Calendar.styled";
import { SelectMenuStyledIT } from "src/Components/SelectMenu/SelectMenu.styled";


var activitiesArr:any = []
const CustomToolbar = (toolbar: any) => {
  const [popOver, setPopOver] = useState<String>('none')
  console.log('toolbar', toolbar, activitiesArr)
  const goToBack = () => {
    toolbar.date.setMonth(toolbar.date.getMonth() - 1);
    toolbar.onNavigate("prev");
  };

  const options = [
    {label : "Today",value:"today"},
    {label : "Trip Start",value:"tripStart"},
    {label : "Trip End",value:"tripEnd"},
  ]
  const goToNext = () => {
    toolbar.date.setMonth(toolbar.date.getMonth() + 1);
    toolbar.onNavigate("next");
  };

  const goToCurrent = (str: string |undefined) => {
    let now: Date
    if (str === 'tripStart') {
      if (activitiesArr.length) {
        //@ts-ignore
        let latests = []
        activitiesArr.map((d: object) => {
          //@ts-ignore          
          latests.push(new Date(d.startDate).getTime())
        })
        //@ts-ignore        
        let min = Math.min(...latests)
        //@ts-ignore        
        let index = latests.indexOf(min)
        console.log('tripStart', activitiesArr, activitiesArr[index].startDate)    
        now = new Date(activitiesArr[index].startDate)
      }
    } else if (str === 'tripEnd') {
      if (activitiesArr.length) {
        //@ts-ignore
        let latests = []
        activitiesArr.map((d: object) => {
         //@ts-ignore    
          latests.push(new Date(d.startDate).getTime())
        })
        //@ts-ignore        
        let min = Math.min(...latests)
        //@ts-ignore        
        let index = latests.indexOf(min)
        now = new Date(activitiesArr[index].endDate)
      }
    } else {
      now = new Date();
    }
    //@ts-ignore    
    toolbar.date.setMonth(now.getMonth());
    //@ts-ignore    
    toolbar.date.setYear(now.getFullYear());
    toolbar.onNavigate("current");
  };

  const label = () => {
    const date = moment(toolbar.date);
    return (
      <span>
        <b>{date.format("MMMM")}</b>
        <span> {date.format("YYYY")}</span>
      </span>
    )
  }

  const smallScreen = useMediaQuery("MOBILE");

  const PopOverShow = (elementDisplay: any) => {
    var element = document.getElementById('popover__content')
    if (element) {
      setPopOver(elementDisplay)
      element.style.display = elementDisplay
    }
  }

  return (
    <div className={"bc-month-row"}>

      {smallScreen && <CalendarMenu
        style={{ marginLeft: 10 }}
        onClick={() => PopOverShow(popOver === 'none' ? 'inline-block' : 'none')} />}
      <div id="popover__content" className="popover__content">
        <div className="popover__message">
          <div>
            <button
              className={`bg-filter-off ${toolbar.view === "day" ? "buttonActive" : ""}`}
              onClick={() => toolbar.onView("day")}>
              <span className="label-filter-off">Day</span>
            </button>
            <button
              className={`bg-filter-off ${toolbar.view === "week" ? "buttonActive" : ""}`}
              onClick={() => toolbar.onView("week")}>
              <span className="label-filter-off">Week</span>
            </button>
            <button
              className={`bg-filter-off ${toolbar.view === "month" ? "buttonActive" : ""}`}
              onClick={() => toolbar.onView("month")}>
              <span className="label-filter-off">Month</span>
            </button>
          </div>
        </div>
      </div>
      <span className={"rbc-toolbar"}>
        {/* <button className={"rbc-toolbar"} onClick={goToCurrent}>
          today
        </button> */}
        <SelectMenuStyledIT>
          <select className='custom-select' name='type' onChange={(e) => goToCurrent(e.target.value)}>
            {options.map((option: any) =>
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            )}                  </select>
        </SelectMenuStyledIT>
      </span>

      <div style={{ display: "inline-block", marginLeft: smallScreen ? "2px" : "129px" }}>
        <button className={"arrowButton"} onClick={goToBack}>
          &#8249;
        </button>
        <label className={"label-date"}>{label()}</label>
        <button className={"arrowButton"} onClick={goToNext}>
          &#8250;
        </button>
      </div>
      <div style={{ float: "right" }} className="rbc-toolbar menu-bar">
        <button
          className={`bg-filter-off ${toolbar.view === "month" ? "buttonActive" : ""}`}
          onClick={() => toolbar.onView("month")}>
          <span className="label-filter-off">Month</span>
        </button>
        <button
          className={`bg-filter-off ${toolbar.view === "week" ? "buttonActive" : ""}`}
          onClick={() => toolbar.onView("week")}>
          <span className="label-filter-off">Week</span>
        </button>
        <button
          className={`bg-filter-off ${toolbar.view === "day" ? "buttonActive" : ""}`}
          onClick={() => toolbar.onView("day")}>
          <span className="label-filter-off">Day</span>
        </button>
      </div>
    </div>
  );
};
interface NavbarProps {
  onPreviousClick: () => void,
  onNextClick: () => void,
  className: string,
  localeUtils: LocaleUtils,
}

const Navbar: React.FC<NavbarProps> = ({
  onPreviousClick,
  onNextClick,
  className,
  localeUtils,
}) => {
  const months = localeUtils.getMonths();
  const styleLeft: CSSProperties = {
    position: 'absolute',
    top: '32px',
    left: '32px',
  };
  const styleRight: CSSProperties = {
    position: 'absolute',
    top: '32px',
    right: '32px',
  };
  return (
    <div className={className}>
      <ArrowLeftIcon style={styleLeft} onClick={() => onPreviousClick()} />
      <ArrowRightIcon style={styleRight} onClick={() => onNextClick()} />
    </div>
  );
}

interface WeekdayProps {
  weekday: number,
  className: string,
  localeUtils: LocaleUtils,
  locale: string,
}

const Weekday: React.FC<WeekdayProps> = ({
  weekday,
  className,
  localeUtils,
  locale,
}) => {
  const weekdayName = localeUtils.formatWeekdayLong(weekday, locale);
  return (
    <div className={className} title={weekdayName}>
      {weekdayName.slice(0, 1)}
    </div>
  );
}
const Itinerary: React.FC<RouteComponentProps & { id?: any }> = ({ id }) => {
  const { state, dispatch, mutateDispatch } = useApi("/trip/getItineraryDashboardData/" + id, "get");
  const [renderName, setRenderName] = useState([])
  const [searchName, setSearchName] = useState('')
  const [checkedValue, setCheckedValue] = useState(false)
  const getItineraryData = useCallback(
    () => dispatch({ type: "GET_ITINERARY_DASHBOARD" }),
    [dispatch]
  );
  const addToActivities = useCallback(
    (payload) => mutateDispatch({ type: "ADD_ADDED_ITINERARY", payload }),
    [dispatch]
  );
  useEffect(() => {
    if (!state.api) return;
    getItineraryData();
  }, [getItineraryData]);

  const { state: { currentDashboard } } = useTrip();
  const [modalAddActivityData, setModalAddActivityData] = useState<CalendarDay>();
  const [showingModalAddActivity, setShowingModalAddActivity] = useState();
  const handleToggleAddActivity = useCallback(
    () => setShowingModalAddActivity(!showingModalAddActivity),
    [showingModalAddActivity]
  );

  const handleOpenModalAddActivity = useCallback(
    (calendarDay: any) => (_: React.MouseEvent<Element, MouseEvent>) => {
      setModalAddActivityData(calendarDay);
      handleToggleAddActivity();
    },
    [handleToggleAddActivity]
  );
  const {
    state: { dashboardOverview },
    dispatch: dispatchDashboardOverview
  } = useDashboardOverview();
  const localizer = BigCalendar.momentLocalizer(moment);
  console.log('state.data.itinerary', state.data.itinerary)
  let events = state.data.itinerary && state.data.itinerary.activities ?
    state.data.itinerary.activities.map((activity: any, index: number) => {
      return {
        start: activity.startDate,
        end: activity.endDate,
        allDay: true,
        title: activity.notes
      }
    })
    : []
    activitiesArr = state.data.itinerary && state.data.itinerary.tripLegs ? state.data.itinerary.tripLegs : []
  let names = state.data.itinerary && state.data.itinerary.tripGuests ? state.data.itinerary.tripGuests : []
  useEffect(() => {
    if (state.data.itinerary && state.data.itinerary.tripGuests) {
      setRenderName(state.data.itinerary.tripGuests)
      dispatchDashboardOverview({
        type: "LOAD_DASHBOARD_OVERVIEW",
        payload: state.data.itinerary
      });
    }
  }, [state.data.itinerary])
  const filterNames = (e: any) => {
    if (e.target.value === '') {
      setRenderName(names)
    } else {
      setSearchName(e.target.value)
    }
  }
  const searchNames = () => {
    //@ts-ignore
    let filterArray = names.filter((o) => o.firstName.toLowerCase().includes(searchName.toLowerCase()))
    setRenderName(filterArray)
  }
  const changeToAll = (e: any) => {
    if (e.target.checked) {
      setRenderName(names)
      setCheckedValue(e.target.checked)
    } else {
      setCheckedValue(e.target.checked)
    }
  }

  const ColoredDateCellWrapper = (children: any) =>
    React.cloneElement(React.Children.only(children.children), {
      style: {
        // backgroundColor: "lightblue",
        padding: '20px 0 50px',
      }
    });

  const eventStyleGetter = (
    event: any,
    start: any,
    end: any,
    isSelected: any
  ) => {
    var backgroundColor = "#" + event.hexColor;
    var style = {
      backgroundColor: backgroundColor,
      borderRadius: "0px",
      opacity: 0.8,
      color: "black",
      border: "0px",
      display: "block"
    };
    return {
      style: style
    };
  };

  const smallScreen = useMediaQuery("MOBILE");
  let rangeobj = {
    from: new Date,
    to: new Date
  }
  let { from, to } = rangeobj
  //@ts-ignore
  const CustomEvent = (event) => { 
    //@ts-ignore
    console.log('event', event)
    return ( 
      <span> {
        //@ts-ignore
        event.title
      } </span> 
    ) 
  }
  return (
    <div style={{ padding: !smallScreen ? "30px" : 0 }}>
      <div
        style={{
          display: "flex",
          borderRadius: "4px",
          border: "solid 1px #e5e7e9",
          background: "#ffff"
        }}
      >
        {!smallScreen ? <div style={{ width: "27%", marginTop: "56px", }}>
          <AddActivityButton
            onClick={handleOpenModalAddActivity(new Date().getDay())}
          >
            + ADD ACTIVITY
          </AddActivityButton>
          <div
            style={{
              height: '314px',
              margin: "10px 2px",
            }}
          >
            {/* <Calendar value={new Date()} />{" "} */}
            <DatePickerStyledWithoutBorder>
              <DayPicker
                className="Selectable"
                numberOfMonths={1}
                //@ts-ignore
                selectedDays={[from, { from, to }]}
                // modifiers={modifiers}
                // onDayClick={handleDayClick}
                showOutsideDays
                navbarElement={Navbar}
                weekdayElement={Weekday}
              />
            </DatePickerStyledWithoutBorder>
          </div>
          <FilterDiv>
            <TextPara>View Calendars</TextPara>
            <div>
              <FilterInput placeholder="filter" onChange={filterNames}/>
              <SearchIcon
                onClick={searchNames}
                style={{
                  position: "relative",
                  top: "-28px",
                  left: "110%",
                  cursor: 'pointer'
                }}
              />
            </div>
            <table>
              <tbody>
                {/* <tr>
                  <td>
                    <input
                      style={{
                        width: "16px",
                        opacity: 0.8,
                        height: "16px",
                        borderRadius: "2px",
                        border: "solid 1px #292c36",
                        backgroundColor: "#ffffff"
                      }}
                      onChange={changeToAll}
                      type="checkbox"
                    />
                  </td>
                  <RadiobuttonTextTd>All</RadiobuttonTextTd>
                </tr> */}
                {renderName.map((text, index) => {
                  return (
                    <tr key={index}>
                      <td>
                        <input
                          style={{
                            width: "16px",
                            opacity: 0.8,
                            height: "16px",
                            borderRadius: "2px",
                            border: "solid 1px #292c36",
                            backgroundColor: "#ffffff"
                          }}
                          // defaultChecked={checkedValue}
                          type="checkbox"
                        />
                      </td>
                      <RadiobuttonTextTd>{
                       //@ts-ignore                        
                        text.firstName
                        }</RadiobuttonTextTd>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </FilterDiv>
        </div> : null}
        <div style={{ width: !smallScreen ? "73%" : '100%' }}>
          <BigCalendar.Calendar
            localizer={localizer}
            events={events}
            startAccessor="start"
            endAccessor="end"
            components={{
              toolbar: CustomToolbar,
              event: CustomEvent,
              month: {
                dateHeader: (props) => {
                  return (
                    <div>{
                      //@ts-ignore
                      props.label
                    }</div>
                  )
                }
              }

            }}
            views={{
              month: true,
              week: true,
              day: true
            }}
            step={60}
            showMultiDayTimes
            defaultDate={new Date()}
            eventPropGetter={eventStyleGetter}
          />
          {smallScreen ? <AddActivityIcon
            style={{
              position: 'relative', bottom: '77px', left: '84%'
            }}
            onClick={handleOpenModalAddActivity(new Date().getDay())}
          /> : null}
        </div>

        {showingModalAddActivity && (
          <NewActivityModal
            tripId={id}
            close={() => setShowingModalAddActivity(false)}
            open={showingModalAddActivity}
            onCancel={() => setShowingModalAddActivity(false)}
            data={modalAddActivityData}
            onAddSuccess={(data: any) => addToActivities(data.activity)}
          />
        )}
      </div>
    </div>
  );
};

export default Itinerary;
