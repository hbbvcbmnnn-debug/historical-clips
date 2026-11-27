# مقاطع تاريخية باستخدام Remotion

المشروع الآن يرسم الشخصيات والخلفيات مباشرةً بـ SVG داخل Remotion، ولا يحتاج صور PNG/JPG أو خطوطًا أو روابط خارجية. المقاس الافتراضي 1920×1080، ويُصدّر MP4 بترميز H.264.

## التشغيل

```bash
npm install
npm run typecheck
npm run dev
npm run render
```

المعاينة في Remotion Studio، والملف النهائي في `out/historical-clips.mp4`.

## المشاهد والشخصيات

عدّل `scenes.json`. الأنواع المتاحة: `march`, `battle`, `celebration`, `location`. كل مشهد يرسم خلفية الصحراء والقلعة والنخيل والحجارة، ويعرض الشخصيات الافتراضية المناسبة لنوعه. يمكن تخصيص `characters` لكل مشهد:

```json
{
  "x": 610,
  "y": 875,
  "scale": 1.2,
  "rotate": 0,
  "flipX": false,
  "outfit": "gold",
  "hat": "fedora",
  "action": "celebrate",
  "prop": "flag"
}
```

الملابس: `formal`, `brown-coat`, `soldier`, `traveler`, `messenger`, `gold`. القبعات: `fedora`, `turban`, `army`, `none`. الحركة: `idle`, `walk`, `run`, `celebrate`, `present`, `point`. الإكسسوارات: `bag`, `letter`, `rifle`, `flag`, `sword`, `stick`, `none`. الإحداثيات بوحدات SVG داخل لوحة 1920×1080؛ `y` موضع القدمين. ملفات الصوت اختيارية: إذا أضفت `narration: "narration-01.mp3"`، ضع الملف في `public/audio/narration-01.mp3`. غياب `narration` يعني أن المشهد صامت.

فقاعات الحوار، أشرطة الصحة، الحركة البطيئة للكاميرا وبطاقة التاريخ متاحة كحقول اختيارية للمشهد. عند بطاقة التاريخ، تظهر رسمة موقع SVG (لا صورة خارجية) بعد تلاشي البطاقة.
