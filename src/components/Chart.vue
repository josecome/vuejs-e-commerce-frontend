<template>
  <Bar id="chartid" :options="chartOptions" :data="chartData" :style="chartStyles" />
</template>

<script>
import { Bar } from 'vue-chartjs'
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale
} from 'chart.js'
import { GREEK_BIN } from 'mysql/lib/protocol/constants/charsets'

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale)

export default {
  name: 'Dashboard_Chart',
  components: { Bar },
  data() {
    return {
      chartData: {
        labels: ['TV', 'LapTop', 'Freezer', 'AC', 'Table', 'Chair'],
        datasets: [
          {
            label: 'Products',
            data: [12, 19, 3, 5, 6, 3],
            backgroundColor: 'rgba(103, 140, 249 , 1)'
          }
        ]
      },
      chartOptions: {
        responsive: true
      }
    }
  },
  methods: {
    async getData() {
      try {
        const res = await axios.get('/api/dashboard_data', {
          params: {
            type_of_data: 'products'
          }
        })
        //this.chartData = res;
      } catch (err) {}
    }
  },
  mounted() {
    this.getData()
  },
  computed: {
    chartData() {
      return this.chartData
    },
    chartOptions() {
      return this.chartOptions
    },
    chartStyles() {
      return {
        /* backgroundColor: "rgba(103, 140, 249 , 1)",*/
      }
    }
  }
}
</script>
