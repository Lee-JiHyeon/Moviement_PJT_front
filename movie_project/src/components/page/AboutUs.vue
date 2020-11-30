<template>
  <div id="Aboutuspage">
    <AboutUsInfo />
  </div>
</template>

<script>
import AboutUsInfo from '@/components/page/aboutus/AboutUsInfo'
export default {
  name: 'AboutUs',
  components: {
    AboutUsInfo,
  }
}
</script>

<style>
#Aboutuspage {
  background-color: black;
  height: 700px;
}
</style>
