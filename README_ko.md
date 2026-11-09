<div align="center">

<a href="https://apiko.app/ko/seedance-2-5-prompts?utm_source=github&utm_medium=banner&utm_campaign=awesome-seedance-2.5-prompts"><img src="assets/banner.jpg" alt="Awesome Seedance 2.5 프롬프트" width="100%"></a>

[![License: CC BY 4.0](https://img.shields.io/badge/License-CC_BY_4.0-lightgrey)](LICENSE)
[![Prompts](https://img.shields.io/badge/Prompts-88_cases-111111)](README_ko.md#menu)
[![Try Seedance 2.5 on APIKO](https://img.shields.io/badge/Try_Seedance_2.5-on_APIKO-4F46E5)](https://apiko.app/ko/models/seedance-2.5?utm_source=github&utm_medium=badge&utm_campaign=awesome-seedance-2.5-prompts&utm_content=model_try)
[![Seedance 2.5 API docs](https://img.shields.io/badge/Seedance_2.5-API_docs-111111)](https://apiko.app/docs/api-manual/video-series/seedance/seedance-2.5?utm_source=github&utm_medium=badge&utm_campaign=awesome-seedance-2.5-prompts&utm_content=docs)

[![🇺🇸 English](https://img.shields.io/badge/%F0%9F%87%BA%F0%9F%87%B8_English-Default-4F46E5)](README.md)
[![🇨🇳 简体中文](https://img.shields.io/badge/%F0%9F%87%A8%F0%9F%87%B3_%E7%AE%80%E4%BD%93%E4%B8%AD%E6%96%87-%E6%9F%A5%E7%9C%8B-4F46E5)](README_zh-CN.md)
[![🇹🇼 繁體中文](https://img.shields.io/badge/%F0%9F%87%B9%F0%9F%87%BC_%E7%B9%81%E9%AB%94%E4%B8%AD%E6%96%87-%E6%9F%A5%E7%9C%8B-4F46E5)](README_zh-TW.md)
[![🇰🇷 한국어](https://img.shields.io/badge/%F0%9F%87%B0%F0%9F%87%B7_%ED%95%9C%EA%B5%AD%EC%96%B4-Current-111111)](README_ko.md)

</div>

# Awesome Seedance 2.5 프롬프트

<a id="introduction"></a>
## 🌟 소개

**Seedance 2.5 프롬프트 88개와 결과 영상. 원테이크·카메라 워크·참조 이미지 예시를 복사해 APIKO에서 실행하세요.**

Seedance 2.5 프롬프트를 복사하고, 만들어진 영상을 확인한 뒤, 텍스트가 채워진 모델 페이지로 바로 보내세요. 결과 영상은 모두 GitHub에서 바로 재생됩니다.

검색과 필터는 [apiko.app/seedance-2-5-prompts](https://apiko.app/ko/seedance-2-5-prompts?utm_source=github&utm_medium=readme&utm_campaign=awesome-seedance-2.5-prompts&utm_content=intro).

> [!NOTE]
> 프롬프트는 작성자가 올린 원문 그대로라 대부분 영어입니다. 제목과 설명은 저희가 썼습니다. 모든 예시에 작성자와 원본 게시물 링크를 달았습니다.

<a id="quick-start"></a>
## 🚀 빠른 시작

**브라우저에서:** 모든 예시에 **APIKO에서 실행** 링크가 있습니다. [apiko.app](https://apiko.app/ko/seedance-2-5-prompts?utm_source=github&utm_medium=quickstart&utm_campaign=awesome-seedance-2.5-prompts&utm_content=browser)에서 해당 예시가 열리며, **사용**을 누르면 프롬프트가 Seedance 2.5 플레이그라운드에 채워집니다.

**API로:** [APIKO API 키](https://apiko.app/ko/dashboard/apikeys?utm_source=github&utm_medium=quickstart&utm_campaign=awesome-seedance-2.5-prompts&utm_content=api_key)를 만든 뒤 작업을 생성하고, 영상이 완성될 때까지 상태를 조회합니다.

```bash
export APIKO_API_KEY="your_key_here"

TASK_ID=$(curl -s https://api.apiko.app/v1/videos \
  -H "Authorization: Bearer $APIKO_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
  "model": "seedance-2.5",
  "duration": 5,
  "resolution": "720p",
  "aspect_ratio": "16:9",
  "prompt": "A paper boat drifting across a calm lake at sunrise, slow dolly-in, soft wind and birdsong."
}' | python3 -c 'import json,sys; print(json.load(sys.stdin)["id"])')

while :; do
  TASK=$(curl -s https://api.apiko.app/v1/videos/$TASK_ID \
    -H "Authorization: Bearer $APIKO_API_KEY")
  printf '%s\n' "$TASK"
  printf '%s' "$TASK" | grep -qE '"status": *"(completed|failed)"|"error": *\{' && break
  sleep 10
done
```

엔드포인트: `POST https://api.apiko.app/v1/videos` (작업 생성) · `GET https://api.apiko.app/v1/videos/{id}` (상태와 결과 조회)

<a id="how-to-write"></a>
## ✍️ Seedance 2.5 프롬프트 작성법

아래 예시에서 반복해 나타나는 작성 패턴과 바로 채워 쓸 수 있는 틀입니다.

- **단일 장면** · `피사체 + 장소 + 동작 + 카메라 + 조명 + 소리` — 누가 어디에 있는지 한 문장으로 쓴 뒤 카메라, 조명, 소리를 더합니다. 텍스트 투 비디오 프롬프트는 여기서 시작하세요.
- **시간 구간 나누기** · `0–5초: 샷 A. 5–10초: 샷 B. …` — 구간마다 동작 하나와 카메라 설명 하나만 적습니다. 30초 이상 카드는 이 방식으로 순서와 속도를 잡습니다.
- **참조 이미지** · `@Image1 = 이 인물. 유지: 얼굴, 헤어, 의상. 무시: 배경.` — 업로드한 순서대로 번호를 붙이고 파일마다 가져올 요소를 적습니다. 버릴 요소도 적지 않으면 그대로 복제될 수 있습니다.
- **카메라 움직임** · `움직임 + 속도 + 대상, 예: 커튼 틈으로 천천히 밀고 들어간다` — 샷마다 움직임은 하나만 쓰고 컷이 있는지 밝힙니다. 카메라 워크 프롬프트에서는 동작을 나열하기보다 '하나의 연속 샷, 컷 없음'이 더 잘 먹힙니다.
- **룩과 제한** · `포맷 또는 필름 + 조명 + 렌즈. 제외: 글자, 변형, 불필요한 인물` — 실제 필름 종류, 렌즈 이름, 빛의 각도로 룩이 빨리 정해집니다. 끝에 제외 항목을 한 줄 넣으면 엉뚱한 글자와 얼굴 변형이 줄어듭니다.

**예시에서 보이는 점**

- **1초마다 할 일을 주세요.** 구간 표시가 있는 긴 프롬프트는 사람도 모델도 읽기 쉽습니다.
- **카메라를 사람처럼 묘사하세요.** '친구가 따라 찍는다', '팔을 뻗어 카메라를 든다' 같은 표현만으로 자연스러운 흔들림이 나옵니다.
- **바뀌면 안 되는 것은 반복하세요.** 인물 고정 프롬프트는 첫 장면뿐 아니라 장면마다 머리와 의상을 다시 적습니다.
- **없는 것도 적으세요.** 여러 애니메이션 카드는 음악·대사·글자를 빼고 환경음만 남깁니다.
- **클립 하나에 아이디어 하나.** 결과가 좋은 짧은 카드는 투영된 달이 실체가 되는 것처럼 사건 하나에 집중합니다.

<a id="menu"></a>
## 📑 목차

- [⭐ 추천](#featured) (6)
- [🎬 시네마틱](prompts/cinematic_ko.md) (23) — 렌즈와 빛, 불가능한 사건 하나로 완성하는 단일 아이디어 영상.
- [📹 다큐·브이로그](prompts/documentary_ko.md) (15) — 핸드헬드, 휴대폰, 캠코더 질감으로 실제 촬영분처럼 보이는 영상.
- [🥊 액션](prompts/action_ko.md) (12) — 싸움, 대결, 추격을 비트 단위로 설계한 장면.
- [🧸 애니메이션](prompts/animation_ko.md) (8) — 플랫 2D부터 패밀리 애니 스타일까지, 애니메·손그림·3D 카툰 룩.
- [💬 대사](prompts/dialogue_ko.md) (5) — 인물이 말하는 장면으로, 목소리·억양·언어를 지정한 예시.
- [👟 제품·패션](prompts/product_ko.md) (4) — 광고 영상, 뷰티 필름, 비트에 맞춘 의상 체인지.
- [⏱️ 장편 클립](prompts/long-form_ko.md) (7) — 30초 이상 길이를 타임코드나 연속 샷 하나로 이어 가는 프롬프트.
- [🖼️ 참조 이미지](prompts/reference_ko.md) (14) — 업로드한 이미지를 캐릭터에 연결하고 이미지마다 무엇을 가져올지 적는 프롬프트.
- [❓ 자주 묻는 질문](#faq)
- [🔗 관련 링크](#related)

<a id="featured"></a>
## ⭐ 추천

<a id="long-form-01"></a>
### 68. 런던 테크노 클럽 30초 무컷

작성자 [@JMSvid](https://x.com/JMSvid) · 30초 · 4:3 · **[▶ APIKO에서 실행](https://apiko.app/ko/seedance-2-5-prompts?utm_source=github&utm_medium=case&utm_campaign=awesome-seedance-2.5-prompts&utm_content=long-form-01#long-form-01)** · [원본 게시물](https://x.com/JMSvid/status/2083210992343756893)

끊김 없는 한 샷을 시간 구간으로 나눠 카메라 동선을 초 단위로 계획합니다.

https://github.com/user-attachments/assets/d857c60c-ed4f-4b6b-99d1-0e0a9a979c42

**프롬프트:**

```text
Original scene, 30 seconds, one continuous shot, no cuts.

0–8 seconds: Inside a packed underground London techno club. The camera holds tightly on the face of a young English woman. She is Caucasian, brunette, with delicate features and melancholy behind her eyes. She remains centered in frame and only sways subtly with the music. Around her, the crowd moves intensely and chaotically, with bodies, arms, shoulders and faces constantly passing close to camera, creating strong motion blur and a sense of pressure and overwhelm.

Fast white strobe lights flash continuously, pushing the image back and forth between near-total darkness and sudden bursts of harsh illumination. In the darker intervals, only silhouettes, rim light, glints of sweat and fragmented movement are visible. Each flash briefly reveals fragments of her face—her eyes, cheekbones, wet strands of hair, and distant expression—before she disappears again into darkness. She feels strangely still and emotionally detached while the crowd around her becomes a mass of blurred bodies and flickering light. Heavy four-on-the-floor techno dominates the soundscape, loud, compressed and physically overwhelming.

8–16 seconds: She stays in this space for a moment longer, absorbing the intensity, then finally breaks her gaze, turns and begins pulling herself out of the crowd. The camera does not cut. It releases from the locked close-up and shifts into a close handheld follow shot, staying just behind and slightly beside her as she pushes through dancers. Bodies knock into her shoulders. Arms and backs occasionally obscure the frame. The camera feels intimate, bumped and instinctive, struggling through the same crowded space with her.

As she leaves the center of the dancefloor, the strobing becomes less dominant and the club lighting grows dirtier and more practical. She enters a narrow back passage leading away from the main room.

16–23 seconds: She moves through a cramped, dirty corridor with graffiti-covered walls, peeling paint, torn posters, exposed pipes, damp patches, flickering fluorescent lights and littered plastic cups on the floor. People lean against the walls smoking, chatting, waiting, watching others pass. She threads through them silently. The camera stays close and observational, catching the rustle of fabric, brief shoulder contact and bodies slipping past in the narrow space.

The music becomes more muffled and distant as she moves farther from the dancefloor. The heavy techno remains present only as a low, dulled throb through the walls. Footsteps, clothing friction, breathing, shuffling bodies and indistinct overlapping crowd chatter become clearer. No individual conversation is intelligible. She does not speak.

23–30 seconds: She pushes through the exit and steps into the cold London night. Outside the club, groups of people stand smoking, talking, drifting in and out of the entrance. Streetlight mixes with spill from the doorway and practical urban light. She walks to the nearest dirty exterior wall and pauses. With slightly shaky hands, she lights a cigarette. The flame briefly illuminates her face. She takes a drag, leans back against the wall, then slowly slides down into a seated position on the pavement.

The camera follows her downward and settles at her level, then holds. She sits smoking in silence, looking past the moving crowd into the distance, disconnected from everything around her. People continue crossing the frame, talking, laughing and smoking nearby, but she feels completely alone inside the busy environment.

The sound transitions from overwhelming club techno, to muffled bass and corridor ambience, to distant low-frequency vibration outside mixed with cigarette lighter clicks, breathing, street ambience, footsteps and indistinct smoker chatter. No dialogue.

The overall image should feel raw, naturalistic and grounded, with visible film grain, slight exposure fluctuation, realistic skin texture and subtle handheld instability. Avoid glossy polish, commercial beauty lighting and music-video slickness.
```

<a id="cinematic-14"></a>
### 14. 궤도에서 잎사귀 위 빗방울까지 한 번의 낙하

작성자 [@Dheepanratnam](https://x.com/Dheepanratnam) · 30초 · 16:9 · **[▶ APIKO에서 실행](https://apiko.app/ko/seedance-2-5-prompts?utm_source=github&utm_medium=case&utm_campaign=awesome-seedance-2.5-prompts&utm_content=cinematic-14#cinematic-14)** · [원본 게시물](https://x.com/Dheepanratnam/status/2083088158804042196)

화살표로 단계를 한 줄에 이어 줌이 멈추지 않게 합니다.

https://github.com/user-attachments/assets/4ab3c6b9-bbd8-4f66-b5fb-8b68d95be0e1

**프롬프트:**

```text
One continuous fall. Orbit → atmosphere → storm → mountains → forest → one raindrop on a leaf.
```

<a id="cinematic-03"></a>
### 3. 폐관된 천문관에서 현실이 되는 투영 달

작성자 [@sebatheepan](https://x.com/sebatheepan) · 15초 · 16:9 · **[▶ APIKO에서 실행](https://apiko.app/ko/seedance-2-5-prompts?utm_source=github&utm_medium=case&utm_campaign=awesome-seedance-2.5-prompts&utm_content=cinematic-03#cinematic-03)** · [원본 게시물](https://x.com/sebatheepan/status/2083546568125288542)

영상이 실체가 되는 한 장면에만 묘사를 집중합니다.

https://github.com/user-attachments/assets/5da73dfc-324e-4eb6-98f3-815269dffa89

**프롬프트:**

```text
An elderly night janitor cleans an abandoned Art Deco planetarium during a thunderstorm. The projected moon becomes physically real and drags the entire auditorium into its gravity. [0–1.5s] Shot 1: Macro shot of mop water trembling in its bucket although the floor is still. [1.5–3s] Shot 2: Wide tracking shot follows the janitor beneath the dark planetarium dome. [3–4.5s] Shot 3: Close-up as the dormant star projector switches on by itself. [4.5–6s] Shot 4: Overhead shot: a perfect moon appears on the dome, shedding fine silver dust. [6–7.5s] Shot 5: The janitor’s flashlight beam bends upward toward the moon. [7.5–9s] Shot 6: Close-up of auditorium seats vibrating as loose screws rise from their mountings. [9–10.5s] Shot 7: Low-angle shot as the projected moon swells into a solid cratered sphere descending from the ceiling. [10.5–12s] Shot 8: The janitor falls upward, catching a brass handrail before leaving the floor. [12–13.5s] Shot 9: Popcorn, tickets and cleaning cloths spiral around the moon in orbital rings. [13.5–15s] Shot 10: Camera rolls ninety degrees as gravity rotates through the auditorium. [15–16.5s] Shot 11: Mop water climbs from the bucket as a transparent floating ribbon. [16.5–18s] Shot 12: Wide shot as seats tear loose and orbit without colliding with the janitor. [18–19.5s] Shot 13: The dome surface fractures into a convincing infinite star field. [19.5–21s] Shot 14: A miniature eclipse shadow begins crossing the moon and freezing everything it touches. [21–22.5s] Shot 15: The janitor swings between floating seats toward the emergency dome lever. [22.5–24s] Shot 16: Close-up: his fingertips catch the lever as the handrail tears loose. [24–25.5s] Shot 17: He pulls it; mechanical shutters race across the dome and extinguish the artificial sun. [25.5–27s] Shot 18: The moon implodes silently into streams of silver dust and collapsing orbital debris. [27–28.5s] Shot 19: Gravity returns; seats slam into place while the janitor lands safely in his rolling bucket. [28.5–30s] Shot 20: Quiet final close-up: he discovers a marble-sized moon in his pocket while the water in his bucket produces a tiny tide. Global style: Photoreal celestial surrealism, physically accurate dust and fluid behavior, deep blacks, silver-blue moonlight, Art Deco brass, realistic collision physics, coherent janitor identity. Effects must originate from the projector, affect real objects, then collapse into the miniature moon. No text, extra people or unexplained teleportation.
```

<a id="cinematic-10"></a>
### 10. 아나모픽 원테이크, 렌즈까지 지정

작성자 [@raza8542121](https://x.com/raza8542121) · 30초 · 16:9 · **[▶ APIKO에서 실행](https://apiko.app/ko/seedance-2-5-prompts?utm_source=github&utm_medium=case&utm_campaign=awesome-seedance-2.5-prompts&utm_content=cinematic-10#cinematic-10)** · [원본 게시물](https://x.com/raza8542121/status/2083129360672776304)

카메라 바디와 렌즈 구성을 적고 연속 카메라 이동 하나를 설계합니다.

https://github.com/user-attachments/assets/b3197de5-6b40-4063-8af1-acde62a7366e

**프롬프트:**

```text
Authentic live-action cinematic footage captured as a continuous one-shot sequence on Arri Alexa 65 with Panavision Ultra Vista anamorphic lenses on real Kodak Vision3 35mm film. Ultra-photorealistic Hollywood adventure film aesthetic with natural film grain, cinematic depth of field, realistic handheld camera inertia, dynamic tracking shots, physically accurate motion blur, volumetric golden-hour sunlight, atmospheric jungle mist, practical lighting, realistic water simulation, authentic environmental interaction, and absolutely no CGI or game-engine appearance.

A powerful Amazonian tribal warrior with weathered bronze skin, long braided black hair decorated with jungle feathers, athletic muscular build, worn leather tribal clothing, and intense recognizable eyes sprints through a dense rainforest while the camera performs an energetic low-angle tracking shot weaving between giant roots, rocks, vines, and tropical vegetation. He bursts out onto the edge of a colossal waterfall and leaps into the air as the camera dives beside him. During freefall his body organically transforms into a gigantic Amazon river crocodile with realistic skeletal restructuring, growing scales, extending jaws, muscular limbs, and a powerful tail before crashing into the river below.

The camera follows underwater in one continuous movement as the crocodile powers through crystal-clear water, scattering schools of fish and passing submerged trees and ancient stone ruins. While swimming at high speed, the crocodile seamlessly transforms into a massive Amazon giant catfish with smooth biological morphing, retracting limbs, sleek skin, broad fins, powerful tail propulsion, and continuous identity preservation. The giant catfish accelerates through flooded jungle ruins before its body thickens and organically transforms into a colossal emerald anaconda with shimmering green scales, enormous muscular coils, and realistic serpentine movement as it glides through submerged temples and rises onto the rainforest floor.

The colossal anaconda rapidly slithers through dense jungle while the camera performs fast ground-level tracking through mud, roots, and foliage. As it launches over a fallen tree, it seamlessly transforms into a powerful black jaguar with sleek black fur, muscular feline anatomy, realistic shoulder movement, explosive sprinting speed, and intense recognizable eyes. The jaguar races through the rainforest before reaching a towering cliff where it leaps into open air. During the jump, its body organically transforms into a majestic giant harpy eagle as black fur becomes feathers, forelegs expand into enormous wings, hind legs become massive talons, and the eagle catches an air current before soaring high above the endless Amazon canopy.

The camera transitions into an FPV-style aerial pursuit as the harpy eagle flies between clouds toward an ancient mountain temple surrounded by waterfalls. The eagle folds its wings into a dramatic dive toward the summit. During the dive, feathers organically become skin, wings become human arms, talons become feet, and the original Amazonian warrior fully reforms with perfect facial identity, braided hair, and worn tribal clothing. He lands powerfully on the temple platform, rises slowly, and looks directly into the camera while the camera performs a slow cinematic push-in. Behind him, endless rainforest, waterfalls, drifting mist, and golden sunlight create an epic final hero shot before a slow fade to black.

Maintain one continuous uninterrupted shot, seamless transitions, consistent character identity, realistic anatomy, believable body weight, physically accurate transformations, natural cloth simulation, hair physics, feather dynamics, water interaction, foliage collision, perfect environmental continuity, Hollywood blockbuster cinematography, ultra-photorealistic live action, no jump cuts, no visual glitches, no cartoon style, no artificial CGI, maximum cinematic realism.
```

<a id="animation-02"></a>
### 52. 컷마다 렌즈가 바뀌는 애니 영화 룩

작성자 [@studio_oneroom](https://x.com/studio_oneroom) · 30초 · 16:9 · **[▶ APIKO에서 실행](https://apiko.app/ko/seedance-2-5-prompts?utm_source=github&utm_medium=case&utm_campaign=awesome-seedance-2.5-prompts&utm_content=animation-02#animation-02)** · [원본 게시물](https://x.com/studio_oneroom/status/2083544722996686991)

초점거리와 조리개를 먼저 정하고 컷마다 다른 렌즈를 줍니다.

https://github.com/user-attachments/assets/657fdadc-d06f-4de6-9b9d-c6b8579039d5

**프롬프트:**

```text
日本のフルカラーアニメ映画、シネマティック高品質映像。
BGMなし、セリフなし、字幕なし、文字なし、環境音あり。
フルサイズ換算24mm F1.4の広角レンズで撮ったような浅い被写界深度とボケ感。
手前の前ボケは大きく柔らかく、背景は自然に溶ける。

# 制約
すべてのカットで画角・アングル・焦点距離を変えて単調にしない。
各カットの角括弧内の数値は、そのカットの開始時刻と終了時刻を秒で示す。
この時刻配分に従って全カットを描き、最後のカットまで到達すること。
姿勢の定義：彼女は全カットを通してキッチンに立って調理している。
屈む動作、座る動作、部屋を出る動作は映さない。
配置の定義：シンクは画面左、コンロは画面右。作業は画面左から右へ移っていく。
カメラは常にカウンターの手前側にあり、この左右関係を全カットで維持すること。
光の定義：唯一の光源は暖かいアンバーの室内灯。
光の状態は全カット通して一定に保ち、時間帯は変えない。
奥行きの定義：すべてのカットで前景・中景・遠景を明確に分離する。
前景には湯気・水の筋・カウンターの縁などを大きくボカして配置し、
被写体を手前から覗き込むような奥行きを作る。
パララックスの定義：カメラが移動するカットでは、
前景を最も速く、中景を中程度、遠景を最も遅く動かし、三層の速度差を明確につけること。

# 登場人物
## 女性
成人女性。
ショートパンツ、裸足、黒いネイル。
人に見せることを意識していない、深夜の部屋着姿。

# 情景
深夜のモダンなキッチン。大きな窓越しに夜景が広がる。
暖かいアンバーの室内灯だけが空間を照らし、
光と影が肌の輪郭をやわらかく浮き上がらせる。
調理の湯気と熱気が空気をわずかに揺らしている。
誰にも見られていない、静かで親密な深夜。
小物の定義：アサリは大量にあり、ステンレスの大きなボウルの中で
底一面に幾重にも重なって水に沈んでいる。
オリーブオイルは細長い透明なガラス瓶に入っており、
口には細い金属の注ぎ口が差してある。傾けて注ぐ。
白ワインは濃い緑のガラス瓶で、ラベルには文字が入っていない。
刻んだパセリはカウンターの小皿に用意されている。
皿は白い浅いパスタ皿が1枚だけ。
奥行き構成：前景に湯気とカウンターの縁、中景に彼女と調理器具、遠景に窓の夜景。

# シーン
深夜、女性が一人でボンゴレを作る。
貝を洗うところから盛り付けまで、料理の手順と彼女の仕草を交互に見せる。
湯気・貝の艶・素肌・何気ない動作が自然にシーンに溶け込んでいく。

cut1: [0.0-1.9]
ワイドショット、斜め後方から。カメラが画面左へゆっくり横移動する。
画面左のシンクの前に立つ彼女の後ろ姿。流水が細く落ちている。
手前を湯気の立つ大鍋の輪郭が大きくボケて速く横切り、
中景の彼女はゆっくりと相対的に流れ、
遠景の窓の夜景はほとんど動かない。三層の速度差を明確につける。
室内灯が背中を暖かく縁取っている。
環境音：流水の音、遠い街のざわめき。

cut2: [1.9-3.2]
クローズアップ、正面のやや上から見下ろす。
流水の下、ネイルを施した両手が山盛りのアサリを掻き混ぜている。
指の間で無数の黒い殻がこすれ合い、表面から細かい砂が流れ落ちていく。
シンクの中にはまだ大量のアサリが積み重なったままになっている。
指先が冷水でわずかに赤らんでいる。
環境音：貝殻がこすれ合う連続した音、水がステンレスを叩く音。

cut3: [3.2-5.4]
クローズアップ、正面のローアングル。
あおりの構図で、前屈みになった上体を下から見上げる。
手前で流水の筋が大きくボケて画面の右端を縦に横切っている。
紺色のくせ毛が重力で前に垂れている。
目線は手元の水に落ち、表情はクールで集中している。
前屈みの姿勢で襟元の布が体から離れて前に垂れ、
鎖骨から胸元へ続くラインが自然に見える。
跳ねた冷水の粒が首から鎖骨に散り、
一粒が鎖骨のくぼみをゆっくりと滑り落ちていく。
水面の反射光が下から顎と首をゆらゆらと照らす。
環境音：流水の音。

cut4: [5.4-6.4]
マクロ、斜め上から。
木のまな板。ネイルを施した指がにんにくを押さえ、
包丁が薄い断面を次々と落としていく。
にんにくの汁が刃に薄く光る。
手前にまな板の木目の縁が大きくボケて入る。
環境音：包丁がまな板を叩くリズミカルな音。

cut5: [6.4-7.6]
クローズアップ、湯面すれすれの水平から。
大きな鍋が激しく沸騰している。
パスタが束になって湯の中へ落ち、白い泡と湯気が勢いよく立ち上がる。
手前を立ちのぼる湯気が厚くボケて流れる。
環境音：激しい沸騰音、パスタが湯に入る音。

cut6: [7.6-8.6]
マクロ、フライパンの縁スレスレの真横から。
まだ冷たいオリーブオイルの中に、にんにくの薄切りと赤唐辛子が沈んでいる。
オイルがゆっくりと温まり、にんにくの縁から細かい泡が立ちはじめる。
環境音：オイルが温まりはじめる微かな音。

cut7: [8.6-9.8]
クローズアップ、右斜め上から。
熱したフライパンの上でボウルが大きく傾けられ、
大量のアサリが一斉に滑り落ちていく。
無数の黒い殻が次々と熱した金属に当たって跳ね、フライパンを埋め尽くす。
油が細かく飛び散る。
手前を薄い湯気がボケて流れる。
環境音：貝が金属に当たる連続した硬い音、油が跳ねる音。

cut8: [9.8-11.2]
クローズアップ、真上からの俯瞰。
緑のガラス瓶の口だけがフレームに入り、ゆっくりと傾けられる。
透明な白ワインが細い一筋の弧を描いて熱したフライパンへ落ちていく。
液体が熱面に触れた瞬間、白い湯気が勢いよく立ち上がり、フレームの上へ抜けていく。
画面に入るのは瓶の口と液体の筋だけで、貝は湯気の下に隠れている。
環境音：液体が熱面で沸き立つ音、湯気が噴き上がる音。

cut9: [11.2-12.3]
クローズアップ、正面の目線の高さ。
ガラス蓋がフライパンにかぶせられる。
蓋の内側が白く曇っていき、その向こうで貝の輪郭がぼやけて見えなくなる。
環境音：ガラスが金属の縁に置かれる音、蓋の中でこもった沸騰音。

cut10: [12.3-15.0]
超クローズアップ、斜め後方のやや低い位置から。
浅い被写界深度で、うなじだけに焦点が合い、
手前の湯気と奥のキッチンは完全に溶ける。
蓋の中の沸騰を待つ間、彼女がわずかに顔を伏せる。
髪が前へ流れて左右に分かれ、うなじが下から順に露わになっていく。
短い産毛が湯気の水分を吸って濡れ、細い束になって肌に張り付いている。
首の付け根から肩へ続くくぼみに影が落ち、その縁を室内灯の光が細く縁取る。
呼吸に合わせて肩がゆっくりと上下し、うなじの肌がわずかに伸び縮みする。
横顔の輪郭と耳の下端だけがフレームの端にわずかに入る。
カメラ固定。
環境音：蓋の中でこもった沸騰音、静かな呼吸。

cut11: [15.0-16.3]
ミディアムクローズアップ、斜め前方のやや低い位置から。
ガラス蓋が持ち上がり、抑えられていた白い蒸気が一斉に噴き上がる。
蒸気が画面の手前を厚く覆い、フライパンの中身が一瞬見えなくなる。
環境音：蓋が外れる音、蒸気が解放される音。

cut12: [16.3-18.6]
クローズアップ、顔アップ、正面やや斜め上から。
立ちのぼった蒸気が彼女の顔をゆっくりと包む。
目がゆっくりと閉じられ、顔がわずかに後ろへ引かれる。
前髪と首筋の産毛が湯気の水分を吸って濡れ、肌に張り付いている。
頬に薄く水滴が浮き、光を受けて細かく光る。
湯気が顎の線に沿って流れ、一筋の雫が首筋をゆっくりと下りていく。
唇がわずかに開き、細い吐息がこぼれる。
カメラ固定。
環境音：蒸気の音、微かな吐息。

cut13: [18.6-19.9]
クローズアップ、左斜め上からの浅い俯瞰。
蒸気が薄れた先で、フライパンを埋め尽くしたアサリが一斉に口を開いている。
無数の殻の内側から乳白色の身が現れ、
白濁した汁が貝の間で細かく泡立って揺れている。
環境音：汁が煮立つ音、殻が開く硬い音。

cut14: [19.9-22.1]
超クローズアップ、真横から。
木の小さなスプーンがすでに唇に触れている。
白濁した汁がゆっくりと口の中へ流れ込み、唇が閉じる。
喉がわずかに動いて汁を飲み下す。
目が細くなり、視線がどこかへ漂う。
スプーンがゆっくりと離れ、下唇に薄く汁の艶が残る。
舌先が下唇をゆっくりとなぞる。
カメラ固定。
環境音：遠くの沸騰音だけが続く静かな間。

cut15: [22.1-23.5]
クローズアップ、背後の高角度から肩越し。
彼女の肩から後頭部がフレーム上部に入り、その先にフライパンが見下ろせる構図。
肩の布と肩甲骨が手前に大きくボケて見える。
トングが湯を纏った麺を持ち上げ、口を開いた貝と白濁した汁の中へ静かに下ろす。
麺が汁を吸い込み、フライパンの中が満たされていく。
環境音：麺が汁に落ちる音、汁が煮立つ音。

cut16: [23.5-25.4]
ミディアムクローズアップ、真後ろのやや高角度から。
フライパンの柄を握った腕が手前に引かれ、フライパンが煽られる。
腰から肩へ力が伝わり、肩甲骨と背中の筋肉が波打つように連動する。
湯気を吸って湿った薄い生地が背中の動きに素直に沿い、
肩のあたりで肌に張り付いたまま揺れる。
肩にかかった布の縁が動きのたびにわずかに位置を変える。
奥で麺と貝がフライパンの中を舞い上がり、
落ちてくるたびに汁が白くとろみを増していく。
環境音：フライパンが振られる金属音、汁が跳ねる音。

cut17: [25.4-27.4]
クローズアップ、右斜め前方から。
熱気の中、汗の細い雫が首筋をゆっくりと伝い、
鎖骨のくぼみに小さく溜まってから、そこを越えて胸元へ滑り落ちていく。
手首の甲がゆっくりと額をなぞる。
目がゆっくりと細くなり、細い吐息が唇からこぼれる。
カメラ固定。
環境音：微かな吐息、遠くで汁が跳ねる音。

cut18: [27.4-28.5]
クローズアップ、皿の高さの水平やや斜めから。
トングが麺を白い浅い皿の上に巻き上げ、
その周りに口を開いたアサリが放射状に置かれていく。
麺の艶と貝の内側の光沢が浮かび上がる。
環境音：盛り付けの音。

cut19: [28.5-29.3]
クローズアップ、皿のすぐ上、斜め上からの浅い俯瞰。
フレーム上部から指先だけが入り、刻んだ緑のパセリを摘まんで開く。
細かい葉が指の間からこぼれ、ゆっくりと舞いながら皿の上へ降りていく。
白濁したソースと貝の上に緑が点々と散っていく。
指先がゆっくりとフレームから消える。
環境音：パセリが落ちる微かな音、湯気の音。

cut20: [29.3-30.0]
クローズアップ、浅い被写界深度、真横から。
完成したボンゴレの皿。フレーム上部から、
細長い透明なガラス瓶を握った黒いネイルの手が入る。
瓶の口には細い金属の注ぎ口が差してある。
瓶がゆっくりと傾けられ、注ぎ口から緑がかった黄金色のオイルが
細い一筋になって落ち、皿の上を横切るように回しかけられる。
瓶が起こされてオイルの筋が途切れると、
手と瓶がゆっくりとフレームから消え、皿だけが暖かい光の中に残る。
湯気が細く立ちのぼり続ける。
カメラ固定。静かに余韻が漂う。
環境音：オイルが落ちる微かな音がやみ、夜の静寂へ。
----------

@capcutapp_jp
capcutcpp & capcutseedance25
```

<a id="documentary-01"></a>
### 24. 핸드헬드 DV 새벽 강아지 산책 브이로그

작성자 [@maxxmalist](https://x.com/maxxmalist) · 15초 · 16:9 · **[▶ APIKO에서 실행](https://apiko.app/ko/seedance-2-5-prompts?utm_source=github&utm_medium=case&utm_campaign=awesome-seedance-2.5-prompts&utm_content=documentary-01#documentary-01)** · [원본 게시물](https://x.com/maxxmalist/status/2085422370362110168)

셀카 시점 오프닝을 먼저 못박고 카메라 설명으로 DV 질감을 끝까지 유지합니다.

https://github.com/user-attachments/assets/3cd0e2a4-0eb2-4277-94f6-ea43e1d484dd

**프롬프트:**

```text
CAMERA: Handheld DV 16mm daily vlog footage. The video MUST begin with her holding the camera at arm's length in selfie mode while stepping outside her apartment building with her dog. The first 20–30 seconds are entirely handheld. Later she occasionally places the camera on a park bench, low stone wall, picnic table, or the ground for wider shots. Keep subtle handheld shake, drifting composition, autofocus hunting, rushed reframing, uneven zooms, exposure breathing, brief accidental face cropping, and imperfect framing throughout. The camera itself is never visible.

LOOK: Warm analog tape texture with gentle film grain, slightly softened sharpness, subtle halation around sunlight, realistic skin tones, low contrast, tiny exposure shifts, and natural motion blur. It should feel like authentic footage from someone's everyday life rather than a polished commercial.

STYLE: A relaxed morning lifestyle vlog. Quiet, cozy, and spontaneous. She occasionally laughs at her dog, pauses to look around, adjusts the leash, brushes hair away from her face, and speaks naturally in short sentences with comfortable pauses.

CHARACTER: EMMA — a beautiful white woman in her mid-20s. Long light brown hair in a messy ponytail, green eyes, minimal makeup, oversized gray hoodie, black biker shorts, white sneakers, and a small crossbody bag. She is walking a happy golden retriever.

SETTING: A peaceful suburban neighborhood on a sunny morning. Tree-lined sidewalks, quiet residential streets, birds singing, a small park with benches, green grass, and soft golden morning light. Very few people are around.

SCENES:

The vlog opens in selfie mode. Emma holds the camera while leaving her apartment building with the golden retriever excitedly pulling on the leash.
"Good morning."
She smiles.
"Someone couldn't wait."
The dog eagerly sniffs everything as they walk down the sidewalk.
She laughs quietly.
"He has to inspect every single tree."
Still holding the camera, she walks into a small neighborhood park.
The dog suddenly stops and stares at a squirrel.
"Oh... there we go."
She smiles and gently shakes her head.
She places the camera on a nearby bench for a wider angle while throwing a tennis ball.
The dog happily chases after it.
"Worth waking up early."
She picks the camera back up.
Walking slowly through the park, she looks up at the trees for a moment.
"It's actually really peaceful out here."
The dog returns with the ball but drops it halfway.
She laughs.
"Close enough."
She sits on the bench while the dog lies beside her.
She scratches behind his ears.
"I think he's happier than I am."
She stands up and continues walking.
The camera stays in selfie mode as they head toward home.
"Coffee is definitely next."
She smiles into the lens.
"See you later."
She gives a small wave and ends the recording.
```

- **[🎬 시네마틱 전체 23개 보기](prompts/cinematic_ko.md)**
- **[📹 다큐·브이로그 전체 15개 보기](prompts/documentary_ko.md)**
- **[🥊 액션 전체 12개 보기](prompts/action_ko.md)**
- **[🧸 애니메이션 전체 8개 보기](prompts/animation_ko.md)**
- **[💬 대사 전체 5개 보기](prompts/dialogue_ko.md)**
- **[👟 제품·패션 전체 4개 보기](prompts/product_ko.md)**
- **[⏱️ 장편 클립 전체 7개 보기](prompts/long-form_ko.md)**
- **[🖼️ 참조 이미지 전체 14개 보기](prompts/reference_ko.md)**

<a id="faq"></a>
## ❓ 자주 묻는 질문

<details>
<summary><b>이 Seedance 2.5 프롬프트는 무료로 쓸 수 있나요?</b></summary>

네, 자유롭게 복사하고 고쳐 쓰세요. 영상의 권리는 카드에 표시된 제작자에게 있으니 재사용 전에 원문을 확인하세요.

</details>

<details>
<summary><b>Seedance 2.5 프롬프트 예시는 어디서부터 보면 되나요?</b></summary>

추천 영역부터 보세요. 업로드할 파일 없이 쓸 수 있는 완성형 프롬프트입니다. 참조 필요 표시가 있는 카드는 작성자의 이미지를 전제로 합니다.

</details>

<details>
<summary><b>Seedance 프롬프트는 어떤 언어로 써야 하나요?</b></summary>

여기 프롬프트는 작성자의 원문 그대로입니다. Seedance 2.5는 중국어와 영어에 더해 스페인어, 인도네시아어, 포르투갈어, 일본어, 말레이어, 태국어, 아랍어, 베트남어, 한국어를 지원하며 최대 20,000자입니다.

</details>

<details>
<summary><b>Seedance 2.5 영상은 얼마나 길게 만들 수 있나요?</b></summary>

480p, 720p, 1080p로 4초에서 30초입니다. 일부 카드는 작성자가 더 긴 길이를 적었으니 30초 이하 클립으로 나눠 쓰세요.

</details>

<details>
<summary><b>참조 이미지·영상·오디오는 어떻게 쓰나요?</b></summary>

Seedance 2.5는 이미지 30장, 영상 10개, 오디오 10개까지 공개 HTTPS URL로 받고, 프롬프트에서 @Image1, @Video1, @Audio1로 부릅니다. 참조 오디오만 단독으로 써도 됩니다.

</details>

<details>
<summary><b>API로 프롬프트를 실행하려면?</b></summary>

prompt에 담아 POST /v1/videos로 보내고, 작업을 폴링한 뒤 결과를 내려받습니다. 필드는 API 문서에 있습니다.

</details>

<details>
<summary><b>내 결과가 예시와 다른 이유는?</b></summary>

생성은 매번 같지 않고, 작성자가 다른 설정이나 도구를 썼을 수도 있습니다. seed를 고정하고 한 번에 한 가지만 바꿔 비교하세요.

</details>

<details>
<summary><b>첫 프레임에서 시작할 수 있나요?</b></summary>

first_image_url로 가능합니다. 영상이 그 프레임의 화면비를 따르므로 aspect_ratio는 보내지 마세요. 첫·끝 프레임은 참조 소재와 함께 쓸 수 없습니다.

</details>


<a id="related"></a>
## 🔗 관련 링크

- [Seedance 2.5 프롬프트 · apiko.app](https://apiko.app/ko/seedance-2-5-prompts?utm_source=github&utm_medium=related&utm_campaign=awesome-seedance-2.5-prompts)
- [Seedance 2.5 실행](https://apiko.app/ko/models/seedance-2.5?utm_source=github&utm_medium=related&utm_campaign=awesome-seedance-2.5-prompts)
- [Seedance 2.5 API 문서](https://apiko.app/docs/api-manual/video-series/seedance/seedance-2.5?utm_source=github&utm_medium=related&utm_campaign=awesome-seedance-2.5-prompts)
- [Seedance API 가격 비교](https://apiko.app/ko/compare/seedance-api-pricing?utm_source=github&utm_medium=related&utm_campaign=awesome-seedance-2.5-prompts)
- [Seedance MCP](https://apiko.app/ko/seedance-mcp?utm_source=github&utm_medium=related&utm_campaign=awesome-seedance-2.5-prompts)
- [AI 영상 생성기](https://apiko.app/ko/video-generator?utm_source=github&utm_medium=related&utm_campaign=awesome-seedance-2.5-prompts)
- [Wan 3.0 프롬프트](https://apiko.app/ko/wan-3-0-prompts?utm_source=github&utm_medium=related&utm_campaign=awesome-seedance-2.5-prompts)
- [APIKO API 코드 예시](https://github.com/tong0619453646-dev/apiko-ai-api-examples)

**다른 프롬프트 모음**

- [Awesome Kling 4.0 Prompts](https://github.com/tong0619453646-dev/awesome-kling-4.0-prompts/blob/main/README_ko.md)
- [Awesome GPT Image 2.6 Prompts](https://github.com/tong0619453646-dev/awesome-gpt-image-2.6-prompts/blob/main/README_ko.md)
- [Awesome Nano Banana 2.1 Prompts](https://github.com/tong0619453646-dev/awesome-nano-banana-2.1-prompts/blob/main/README_ko.md)
- [Awesome GPT Image 2.5 Prompts](https://github.com/tong0619453646-dev/awesome-gpt-image-2.5-prompts/blob/main/README_ko.md)
- [Awesome GPT Image 2 Prompts](https://github.com/tong0619453646-dev/awesome-gpt-image-2-prompts/blob/main/README_ko.md)
- [Awesome Claude Opus 5.5 Video Prompts](https://github.com/tong0619453646-dev/awesome-claude-opus-5.5-video-prompts/blob/main/README_ko.md)
- [Awesome Wan 3.0 Prompts](https://github.com/tong0619453646-dev/awesome-wan-3.0-prompts/blob/main/README_ko.md)

<a id="license"></a>
## 📄 라이선스와 출처

프롬프트와 결과 영상의 권리는 각 카드에 표시된 제작자에게 있으며, 표시를 누르면 원문 게시물로 이동합니다. 제목, 설명, 번역, 빌드 스크립트는 [CC BY 4.0](LICENSE)으로 배포합니다.

이 목록이 도움이 됐다면 ⭐ 를 눌러 다른 사람도 찾을 수 있게 해 주세요.
