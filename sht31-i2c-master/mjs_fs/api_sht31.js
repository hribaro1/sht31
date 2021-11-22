// Mongoose OS SHT31 library API. Source C API is defined at:

let SHT31 = {
    _crt: ffi('void *mgos_sht31_create(void *, int)'),
    _dst: ffi('void mgos_sht31_destroy(void *)'),
    _gt: ffi('float mgos_sht31_getTemperature(void *)'),
    _gh: ffi('float mgos_sht31_getHumidity(void *)'),
  
    // **`DHT.create(pin, type)`**
    // Create a DHT object. `type` could be `DHT.DHT11`, `DHT.DHT21`,
    // `DHT.DHT22`. Return value: an object with the methods described below, or
    // 'null' in case of a failure.
    // Example:
    // ```javascript
    // let mydht = DHT.create(5, DHT.DHT11);
    // print('Temperature:', mydht.getTemp());
    // ```
    create: function(bus, addr) {
      let obj = Object.create(SHT31._proto);
      obj.sht31 = SHT31._crt(bus, addr);
      return obj;
    },
  
    _proto: {
      // **`mydht.close()`**
      // Close DHT handle. Return value: none.
      destroy: function() {
        return SHT31._dst(this.sht31);
      },
  
      // **`mydht.getTemp()`**
      // Return temperature in degrees C or 'NaN' in case of a failure.
      getTemperature: function() {
        return SHT31._gt(this.sht31);
      },
  
      // **`mydht.getHumidity()`**
      // Return humidity in RH% or 'NaN' in case of a failure.
      getHumidity: function() {
        return SHT31._gh(this.sht31);
      },
    },
  };
  