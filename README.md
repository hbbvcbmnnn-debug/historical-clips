# مقاطع تاريخية باستخدام Remotion

مشروع Remotion لتوليد فيديو تاريخي بنسبة 16:9 من `scenes.json`، مع تعليق صوتي عربي، حركة بطيئة للصور، شريط عنوان ثابت، وفقاعات حوار اختيارية، وأشرطة صحة اختيارية، وبطاقات تاريخ تنتقل إلى صورة الموقع. الإخراج الافتراضي MP4 بترميز H.264.

## التشغيل

يتطلب Node.js 18 أو أحدث. انسخ ملفات الوسائط إلى مجلد `public/` مع الحفاظ على المسارات المكتوبة في JSON، ثم:

```bash
npm install
npm run dev
npm run render
```

سيكون الملف الناتج `out/historical-clips.mp4`. يُقصّ صوت المشهد عند نهاية مدة المشهد المحددة؛ اضبط `durationInSeconds` كي يتناسب مع طول التعليق.

لإظهار خط Naskh محليًا، أضف خطًا متغيرًا باسم `public/fonts/NotoNaskhArabic-Variable.ttf`. من دونه سيستخدم المتصفح خطًا عربيًا مناسبًا متاحًا على النظام.

## تنسيق `scenes.json`

كل مسار وسائط نسبي إلى `public/`. الحقول الأساسية للمشهد هي `image` و`narration`. مدة المشهد اختيارية، وتستخدم القيمة العامة `defaultSceneDurationInSeconds` عند عدم تحديدها.

```json
{
  "title": "حكايات من التاريخ",
  "fps": 30,
  "width": 1920,
  "height": 1080,
  "defaultSceneDurationInSeconds": 8,
  "scenes": [
    {
      "title": "عنوان المشهد",
      "image": "images/scene-01.jpg",
      "narration": "audio/narration-01.mp3",
      "durationInSeconds": 8,
      "pan": {"x": 0, "y": 0},
      "speechBubble": {"text": "نص عربي من اليمين إلى اليسار", "speaker": "الراوي", "position": "right"},
      "healthBars": {
        "left": {"label": "الطرف الأول", "value": 82, "color": "#e34b4b"},
        "right": {"label": "الطرف الثاني", "value": 64, "color": "#42a5f5"}
      },
      "dateCard": {
        "date": "عام ١٢٥٨م",
        "location": "بغداد",
        "locationImage": "images/baghdad.jpg",
        "displayDurationInSeconds": 2.5
      }
    }
  ]
}
```

`title`, `speechBubble`, `healthBars`, `dateCard`, و`pan` اختيارية. تظهر بطاقة التاريخ أولًا، ثم تنتقل الصورة تدريجيًا إلى `locationImage`. قيمة كل شريط صحة من 0 إلى 100. استخدم `position: "left"` أو `"right"` لتحديد موضع فقاعة الكلام.

## التصدير

- MP4 / H.264: `npm run render`
- MOV / ProRes: `npm run render:prores`

لرندر MP4 مباشرة مع مسار مختلف: `npx remotion render src/index.ts HistoricalClips out/custom.mp4 --codec=h264`.
