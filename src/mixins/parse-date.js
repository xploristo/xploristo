import DateTime from 'luxon/src/datetime.js';

export default {
  methods: {
    parseDate(
      value,
      timezone = 'Europe/Madrid',
      format = DateTime.DATETIME_MED
    ) {
      if (!value) {
        return '';
      }
      const lang = sessionStorage.getItem('lang') || 'en';
      const dateTime = DateTime.fromISO(value, {
        zone: timezone,
      })
        .setLocale(lang)
        .toLocaleString(format);

      return dateTime;
    },
  },
};
