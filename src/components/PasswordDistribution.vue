<template>
  <div class="distribution">
    cycles: {{ cycles }}
    <br />
    <label><input type="checkbox" @change="doSort = $event.target.checked" :checked="doSort" />
      sort</label>
    <br />
    <br />
    variations: {{ variations }} / {{ Math.pow(values, length) }}
    <br />
    <ul>
      <li v-for="(distribution, i) in distributions.reverse()" :key="i">
        <div class="line" :style="{ width: `${(100 * distribution) / maxDistribution}%` }"></div>
      </li>
    </ul>
  </div>
</template>

<script>
import { createPassword } from "@/gameplay";

export default {
  data() {
    return {
      length: 2,
      values: 10,
      doSort: true,
      cycles: 0,
      runs: {},
    };
  },

  mounted() {
    this.run();
  },

  updated() {
    setTimeout(() => this.run());
  },

  computed: {
    variations() {
      return new Set(Object.keys(this.runs)).size;
    },

    distributions() {
      const cycles = this.cycles;
      const keys = Object.keys(this.runs);
      let result = keys.map((k) => this.runs[k] / cycles);

      if (this.doSort) {
        result = result.slice().sort();
      }

      return result;
    },

    maxDistribution() {
      return Math.max(...this.distributions);
    },
  },

  methods: {
    run() {
      const pw = createPassword(this.length, this.values).join("");

      if (!(pw in this.runs)) {
        this.runs[pw] = 0;
      }

      this.cycles++;
      this.runs[pw]++;
    },
  },
};
</script>

<style scoped>
.distribution {
  background-color: #68667b;
  bottom: 0;
  color: #e4e4e4;
  font-family: monospace;
  left: 0;
  padding: 1rem;
  position: absolute;
  right: 0;
  top: 0;
}

ul {
  font-size: 8px;
  padding: 0;
}

li {
  list-style: none;
}

.line {
  background-color: #e4e4e4;
  display: block;
  height: 1px;
}
</style>
