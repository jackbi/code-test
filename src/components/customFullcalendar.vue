<template>
  <div class="fullcalendar-cunstom">
    <div class="fullcalendar-tool">
      <div class="fullcalendar-tool-left">
        <el-date-picker
          v-model="fullcalendarDate"
          type="month"
          @change="changeMonth"
          value-format="yyyy-MM"
          placeholder="选择月"
          style="margin-right: 10px"
          size="mini"
        >
        </el-date-picker>
        <el-button type="primary" @click="preMonth" size="mini">上月</el-button>
        <el-button type="primary" @click="nextMonth" size="mini"
          >下月</el-button
        >
        <el-button type="primary" @click="todayMonth" size="mini"
          >今天</el-button
        >
      </div>
      <div class="fullcalendar-tool-mid"></div>
      <div class="fullcalendar-tool-right"></div>
    </div>
    <div class="fullcalendar-content">
      <FullCalendar ref="myCalendar" :options="calendarOptions" />
    </div>
  </div>
</template>

<script>
import FullCalendar from "@fullcalendar/vue";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
export default {
  name: "custom-fullcalendar",
  components: {
    FullCalendar,
  },
  props: {
    value: Array,
    cellContent: {
      type: Function,
      default: (arg) => {
        const { dayNumberText } = arg;
        let el = `<div style="padding-right: 5px; width: 100%; height: 100%; display: flex; align-items: center; justify-content: space-between;">
                <span></span>
                <span>${dayNumberText}</span>
          </div>`;
        return { html: el };
      },
    },
  },
  data() {
    return {
      calendarOptions: {
        plugins: [dayGridPlugin, interactionPlugin],
        headerToolbar: {
          left: "",
          center: "",
          right: "",
        },
        buttonText: {
          today: "今天",
        },
        initialView: "dayGridMonth",
        locale: "zh-cn",
        firstDay: 1,
        editable: false,
        height: "100%",
        contentHeight: "100%",
        events: [],
        dayCellContent: this.cellContent,
        dateClick: this.handleDateClick,
        eventClick: this.handleEventClick,
      },
      calendarApi: null,
      fullcalendarDate: "",
    };
  },
  computed: {},
  watch: {
    value: {
      deep: true,
      handler: function(val) {
        this.setEvents(val);
      },
    },
    dayCellContent: {
      handler: function() {
        this.calendarApi.render();
      },
    },
  },
  methods: {
    init() {
      this.$nextTick(() => {
        this.calendarApi = this.$refs.myCalendar.getApi();
        setTimeout(() => {
          this.calendarApi.updateSize();
        });
        this.fullcalendarDate = this.calendarApi.getDate();
        this.setEvents(this.value);
      });
    },
    /**
     * @description: 跳转月份
     * @return {*}
     */

    changeMonth() {
      this.calendarApi.gotoDate(this.fullcalendarDate);
    },
    /**
     * @description: 上一个月
     * @return {*}
     */

    preMonth() {
      this.calendarApi.prev();
      this.fullcalendarDate = this.calendarApi.getDate();
    },
    /**
     * @description: 下一个月
     * @return {*}
     */

    nextMonth() {
      this.calendarApi.next();
      this.fullcalendarDate = this.calendarApi.getDate();
    },
    /**
     * @description: 今天
     * @return {*}
     */

    todayMonth() {
      this.calendarApi.today();
      this.fullcalendarDate = this.calendarApi.getDate();
    },
    /**
     * @description: 设置事件
     * @return {*}
     */

    setEvents(datas) {
      this.calendarOptions.events = datas;
      this.calendarApi.render();
    },
    /**
     * @description: 点击日期
     * @return {*}
     */

    handleDateClick(dateInfo) {
      this.$emit("dateClick", dateInfo);
    },
    handleEventClick(eventInfo) {
      this.$emit("eventClick", eventInfo);
    },
  },
  created() {
    this.init();
  },
  mounted() {},
  beforeCreate() {},
  beforeMount() {},
  beforeUpdate() {},
  updated() {},
  beforeDestroy() {},
  destroyed() {},
  activated() {},
};
</script>
<style lang="less" scoped>
.fullcalendar-cunstom {
  width: 100%;
  height: 100%;
  .fullcalendar-tool {
    width: 100%;
    height: 45px;
    display: -webkit-box;
    display: -moz-box;
    display: -ms-flexbox;
    display: -webkit-flex;
    display: flex;
    -webkit-box-align: center;
    -moz-align-items: center;
    -webkit-align-items: center;
    align-items: center;
    -webkit-box-pack: justify;
    -moz-justify-content: space-between;
    -webkit-justify-content: space-between;
    justify-content: space-between;
  }
  .fullcalendar-content {
    width: 100%;
    height: calc(100% - 45px);
  }
  ::v-deep {
    a {
      color: #333;
    }
    .fc-day-sat,
    .fc-day-sun {
      background-color: #f5f5f5;
    }
  }
}
</style>
