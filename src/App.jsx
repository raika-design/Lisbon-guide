import { useState, useEffect, useCallback } from "react";

const CATEGORIES = [
  { id: "favorites", label: "❤️ お気に入り", emoji: "❤️" },
  { id: "seafood", label: "🐙 シーフード", emoji: "🐙" },
  { id: "cafe", label: "☕ カフェ＆スイーツ", emoji: "☕" },
  { id: "street", label: "🥪 ストリートフード", emoji: "🥪" },
  { id: "famous", label: "🏛️ 有名観光スポット", emoji: "🏛️" },
  { id: "hidden", label: "💎 穴場スポット", emoji: "💎" },
  { id: "art", label: "🎨 アートミュージアム", emoji: "🎨" },
];

const DATA = {
  seafood: [
    { id: "s1", name: "Cervejaria Ramiro", area: "マーティン・モニス", price: "€€€", desc: "リスボン最高峰のシーフード。カニ、エビ、マテ貝が絶品。締めのビーフサンドも名物。予約必須、開店30分前に並ぶのが吉。", tip: "1956年創業のビアレストランが起源", must: "タイガーシュリンプ＆マテ貝" },
    { id: "s2", name: "Adega das Gravatas", area: "市街地郊外", price: "€€", desc: "壁一面にネクタイが飾られた名物店。リスボン最高のPolvo à Lagareiro（タコのオリーブオイル焼き）と評判。地元客で賑わう。", tip: "ネクタイ（gravatas）のコレクションが圧巻", must: "Polvo à Lagareiro" },
    { id: "s3", name: "Frade dos Mares", area: "中心部からタクシー圏内", price: "€€", desc: "5,000件以上のレビューを誇る人気店。オーブン焼きタコが2人前のボリュームでリーズナブル。テーブルのボタンでスタッフを呼べる便利なシステム。", tip: "TripAdvisorで常に上位", must: "オーブン焼きタコ（ニンニク＆ポテト添え）" },
    { id: "s4", name: "Sea Me Peixaria Moderna", area: "シアード", price: "€€€", desc: "ポルトガル×日本のフュージョンシーフード。Time Out Marketにも支店あり。寿司やマグロタルタルも楽しめる。", tip: "日本人にも馴染みやすい味", must: "マグロタルタル＆タコのホットドッグ（市場店）" },
    { id: "s5", name: "Solar dos Presuntos", area: "サント・アンタォン通り", price: "€€€€", desc: "1974年創業。ロナウドやベッカムも訪れた名店。ロブスターライス、カタプラーナが名物。最初に出る生ハム＆チーズは有料なので注意。", tip: "壁の有名人の似顔絵コレクションが見どころ", must: "ロブスターライス（Arroz de Lavagante）" },
    { id: "s6", name: "Ponto Final", area: "カシーリャス（対岸）", price: "€€", desc: "フェリーで渡った対岸のリバーサイドレストラン。リスボンのスカイラインを眺めながらその日の漁獲を楽しむ最高のロケーション。", tip: "3ヶ月前から予約推奨", must: "日替わりの焼き魚" },
    { id: "s7", name: "A Cevicheria", area: "プリンシペ・レアル", price: "€€€", desc: "天井の巨大タコオブジェが目印。ペルー風セヴィーチェのクリエイティブなシーフード。ピスコサワーも絶品。", tip: "予約なしだと40分以上待つことも", must: "シグネチャーセヴィーチェ" },
    { id: "s8", name: "DOIS ARCOS", area: "バイシャ（ロシオ駅近く）", price: "€€", desc: "日本語メニューあり。タコのリゾットが日本人の口に合う味付けで大人気。現金のみ。", tip: "日本人観光客の定番", must: "タコのリゾット" },
    { id: "s9", name: "A Casa do Bacalhau", area: "アルファマ郊外", price: "€€", desc: "「バカリャウの家」の名の通り、干しダラ料理の専門店。貴族の邸宅を改装した石造り空間。コスパ抜群。", tip: "地元民が『わざわざ行くべき』と推す店", must: "バカリャウ料理（数十種類）" },
    { id: "s10", name: "Eating Bear", area: "中心部", price: "€€", desc: "醤油ベースのタコサラダやごま油＆醤油のツナタルタルなど、日本人に刺さる味わいのモダンポルトガル料理。ワインカクテルも豊富。", tip: "日本の居酒屋感覚で楽しめる", must: "ツナのタルタル＆タコサラダ" },
    { id: "s11", name: "Pica-Pau Restaurant", area: "リスボン市内", price: "€€", desc: "伝統的なポルトガル料理専門のにぎやかなレストラン。在住日本人からも高評価。", tip: "固定メニューでタコ料理は年中OK", must: "Polvo à Lagareiro" },
    { id: "s12", name: "Corrupio", area: "カイス・ド・ソドレ", price: "€€€", desc: "カスタムタイルで覆われた美しい店内。紫さつまいものピューレと合わせたタコサラダが斬新。", tip: "小皿料理（ペティスコス）が充実", must: "タコサラダ＆紫芋ピューレ" },
  ],
  cafe: [
    { id: "c1", name: "Pastéis de Belém", area: "ベレン地区", price: "€", desc: "1837年創業のエッグタルト元祖。秘伝レシピのパステル・デ・ナタは格別。朝8時前に行けば行列回避。", tip: "シナモンか粉砂糖をかけて", must: "パステル・デ・ナタ" },
    { id: "c2", name: "Manteigaria", area: "シアード / バイロ・アルト", price: "€", desc: "地元民は実はこちら派。目の前で焼き上がるナタが見られるオープンキッチン。ベレンより空いている。", tip: "ベレンまで行く時間がなければここ", must: "焼きたてパステル・デ・ナタ" },
    { id: "c3", name: "A Brasileira", area: "シアード", price: "€€", desc: "1905年創業の老舗。国民的詩人ペソアの銅像が店先に。地下にはレストランも併設。", tip: "テラス席でペソア像と記念撮影を", must: "ビカ（エスプレッソ）" },
    { id: "c4", name: "Confeitaria Nacional", area: "フィゲイラ広場", price: "€€", desc: "1829年創業、リスボン最古級の菓子店。19世紀のインテリアが再現されたエレガントな空間。伝統菓子ボーロ・レイの発祥の店。", tip: "クリスマス菓子だけでなく通年のスイーツも充実", must: "ボーロ・レイ＆チョコレートムース" },
    { id: "c5", name: "SIMPLI COFFEE", area: "マルケス・デ・ポンパル周辺", price: "€€", desc: "自家焙煎スペシャルティコーヒーの専門店。バリスタが淹れるコーヒーとフォトジェニックなブランチが楽しめる。", tip: "市内に3店舗。Braamcamp通り店が穴場", must: "カフェモカ＆ブランチ" },
    { id: "c6", name: "Seagull Method", area: "リスボン市内", price: "€€", desc: "朝食ブランチの人気店。予約不可なので早めに行くのがベスト。", tip: "駐在者・旅行者両方に大人気", must: "卵料理＆サワードウトースト" },
  ],
  street: [
    { id: "st1", name: "ビファーナ (Bifana)", area: "どこでも", price: "€3〜4", desc: "白ワイン・ニンニク・パプリカでマリネした豚肉のサンドイッチ。リスボンのストリートフードの王様。", tip: "Bifanas de Afonso（アルファマ地区）が絶品", must: "マスタード＆チリオイルで" },
    { id: "st2", name: "プレゴ (Prego)", area: "どこでも", price: "€3〜5", desc: "ビファーナの牛肉版。ニンニク風味のグリルビーフサンド。", tip: "Rui dos Pregosが有名", must: "ビール（Imperial）と一緒に" },
    { id: "st3", name: "パステイス・デ・バカリャウ", area: "どこでも", price: "€1〜2", desc: "塩ダラ・ポテト・コリアンダーの揚げコロッケ。揚げたてに出会えたらラッキー。", tip: "A Tendinha do Rossio（1840年創業）", must: "ビールのお供に" },
    { id: "st4", name: "シャムーサス (Chamuças)", area: "地下鉄駅周辺", price: "€1〜2", desc: "旧植民地ゴアやモザンビーク由来のポルトガル版サモサ。スパイシーチキン入りが定番。", tip: "行列のある屋台が美味しいサイン", must: "チキン味" },
    { id: "st5", name: "ジンジーニャ (Ginjinha)", area: "ロシオ広場周辺", price: "€1〜2", desc: "さくらんぼのリキュール。チョコカップで飲むのがリスボン流。", tip: "A Ginjinhaがロシオ広場の有名店", must: "チョコカップで一杯" },
    { id: "st6", name: "ショリソ・ア・ボンベイロ", area: "レストラン", price: "€5〜8", desc: "テーブルで炎を上げてグリルする「消防士のソーセージ」。外カリ中ジューシー。", tip: "写真映え抜群", must: "パンと一緒に" },
    { id: "st7", name: "パォン・コン・ショリソ", area: "パン屋", price: "€2〜3", desc: "ショリソソーセージを練り込んだスモーキーなパン。テラコッタオーブン焼きが最高。", tip: "地元パン屋で購入がベスト", must: "焼きたてを" },
    { id: "st8", name: "グリルドサーディン", area: "アルファマ地区", price: "€5〜8", desc: "6月のサント・アントニオ祭に街中に漂う炭火焼きイワシの香り。5月でもレストランで食べられる。", tip: "コーンブレッドとレモンでシンプルに", must: "ビファーナと並ぶ夏の風物詩" },
  ],
  famous: [
    { id: "f1", name: "ジェロニモス修道院", area: "ベレン地区", price: "€10", desc: "マヌエル様式の壮麗な世界遺産。大航海時代の栄華を伝える圧巻の建築。回廊の彫刻が見事。", tip: "5月は混雑するので朝一番で", must: "回廊の石彫刻" },
    { id: "f2", name: "ベレンの塔", area: "ベレン地区", price: "€8", desc: "テージョ川に浮かぶ16世紀の要塞。大航海時代の象徴。内部にも入れる。", tip: "ジェロニモス修道院とセットで", must: "テージョ川越しの外観" },
    { id: "f3", name: "サン・ジョルジェ城", area: "アルファマ地区", price: "€10", desc: "紀元前から続くリスボンの城塞。旧市街を一望できる絶景スポット。夕暮れ時がベスト。", tip: "午前中が空いている", must: "展望台からの360度パノラマ" },
    { id: "f4", name: "サンタ・ジュスタのエレベーター", area: "バイシャ地区", price: "€5", desc: "1902年完成のネオ・ゴシック様式の鉄製エレベーター。展望台からリスボンを一望。", tip: "午前中がおすすめ", must: "展望台からの眺め" },
    { id: "f5", name: "トラム28番", area: "全市", price: "€3", desc: "アルファマ、シアードなどを走る有名な路面電車。車窓からの風景が最高。", tip: "朝早く始発駅から乗ると座れる", must: "車窓からのアルファマの街並み" },
    { id: "f6", name: "コメルシオ広場", area: "バイシャ地区", price: "無料", desc: "テージョ川に面した壮大な広場。凱旋門をくぐってアウグスタ通りへ散策。", tip: "夕日の時間帯が美しい", must: "凱旋門の上からの眺望" },
    { id: "f7", name: "Time Out Market", area: "カイス・ド・ソドレ", price: "様々", desc: "トップシェフが集結するフードホール。リスボンの食を一度に体験できる。", tip: "11時か15時以降が空いている", must: "各店のシグネチャーを食べ比べ" },
    { id: "f8", name: "発見のモニュメント", area: "ベレン地区", price: "€6", desc: "大航海時代の航海者たちの彫刻が並ぶ記念碑。上に登れば素晴らしいパノラマ。", tip: "ベレン地区散策の一部として", must: "足元の世界地図モザイク" },
  ],
  hidden: [
    { id: "h1", name: "Casa do Alentejo", area: "サント・アンタォン通り", price: "€€", desc: "目立たない入口を押すと突然ムーア風の宮殿が出現。タイル、アーチ、中庭が広がる秘密の空間。レストランもあり。", tip: "入口が本当にわかりにくい", must: "中庭のアズレージョ" },
    { id: "h2", name: "Palácio da Ajuda", area: "ベレン郊外", price: "€5", desc: "シントラの宮殿に匹敵する豪華なネオクラシック宮殿。観光客が少なく静かに見学可能。", tip: "シントラの混雑を避けたい人に最適", must: "豪華な王室の部屋" },
    { id: "h3", name: "Miradouro da Senhora do Monte", area: "グラサ地区", price: "無料", desc: "リスボン最高の展望台。カラフルな屋根、橋、テージョ川の大パノラマ。", tip: "サンセットの時間が最高", must: "ワインを持って夕日鑑賞" },
    { id: "h4", name: "Marvila地区", area: "東リスボン", price: "無料", desc: "旧倉庫街がアートスタジオ、ポップアップバー、レストランに変貌した新興クリエイティブ地区。", tip: "週末が特に活気あり", must: "8 Marvilaのアートシーン" },
    { id: "h5", name: "LX Factory", area: "アルカンタラ", price: "無料", desc: "旧工場を改装したクリエイティブ複合施設。レストラン、ストリートアート、個性派ショップが集結。", tip: "25 de Abril橋の真下", must: "Ler Devagar（巨大な本屋）" },
    { id: "h6", name: "Feira da Ladra（泥棒市）", area: "アルファマ", price: "無料", desc: "毎週火曜＆土曜のリスボン最古の蚤の市。ビンテージ品、アズレージョタイル、掘り出し物が見つかる。", tip: "朝早くがバーゲンのチャンス", must: "ビンテージのアズレージョタイル" },
    { id: "h7", name: "トラム24番", area: "全市", price: "€3", desc: "28番と同じ黄色いレトロトラムだが、ずっと空いていて座れる穴場ルート。", tip: "28番の混雑に疲れたら", must: "のんびり車窓観光" },
    { id: "h8", name: "Pavilhão Chinês", area: "プリンシペ・レアル", price: "€€", desc: "おもちゃ、ミニチュア、骨董品で埋め尽くされた不思議なバー。ビリヤード台もあり。", tip: "カクテルを飲みながら店内探検", must: "カクテル片手に宝探し気分" },
    { id: "h9", name: "Estrela Basilica（屋上）", area: "エストレラ地区", price: "少額", desc: "18世紀の大聖堂。屋上に登ると壮大なドームと鐘楼を間近で見られ、街の絶景も。", tip: "教会自体は無料、屋上が有料", must: "ドームを間近で" },
  ],
  art: [
    { id: "a1", name: "Calouste Gulbenkian / CAM", area: "サルダーニャ", price: "€10", desc: "レンブラント〜古代ギリシャ・ローマまで、世界屈指のコレクション。2024年に隈研吾設計の新棟CAM（近現代美術）がオープン。", tip: "⚠️ 本館は2026年7月まで改修中。CAMと庭園は営業中", must: "CAMの近現代アート＆庭園散策" },
    { id: "a2", name: "Museu Nacional de Arte Antiga", area: "サントス", price: "€6", desc: "ポルトガル国立美術館。ボッシュ、デューラーの作品のほか、日本人を描いた南蛮屏風も収蔵。", tip: "⚠️ ヨーロッパ絵画ギャラリーは2026年5月まで改修予定", must: "南蛮屏風＆聖ヴィンセント祭壇画" },
    { id: "a3", name: "MAAT", area: "ベレン地区", price: "€9", desc: "テージョ川沿いの未来的な建物。アート×建築×テクノロジーをテーマにした展示。屋上からの夕日が絶景。", tip: "1日の最後に訪れてサンセットを", must: "屋上テラスからのパノラマ" },
    { id: "a4", name: "MAC/CCB（現代美術館）", area: "ベレン地区", price: "無料（常設展）", desc: "ウォーホル、ダリ、ピカソなど20〜21世紀の主要美術運動をカバー。常設展は無料。", tip: "ジェロニモス修道院と同日に回れる", must: "ポップアート＆シュルレアリスム" },
    { id: "a5", name: "MACAM", area: "アルカンタラ・ベレン", price: "€15", desc: "2025年3月オープンのリスボン最新美術館。600点以上のコレクション。ヨーロッパ初のミュージアムホテルでもある。", tip: "4つのギャラリー＋カフェ＆レストラン併設", must: "ポルトガル美術ギャラリー" },
    { id: "a6", name: "国立アズレージョ美術館", area: "東リスボン", price: "€5", desc: "ポルトガル独自のタイル芸術「アズレージョ」の500年の歴史を展示。1755年大地震前のリスボンを描いた全長35mのタイル画は圧巻。", tip: "⚠️ 2025年11月から改修中、2026年後半再開予定", must: "リスボンパノラマタイル画" },
    { id: "a7", name: "Museu do Oriente", area: "アルカンタラ", price: "€6", desc: "東洋美術のコレクション。日本のポップカルチャー展なども開催。アジア好きにはたまらない。", tip: "金曜は18時〜22時無料", must: "日本の南蛮美術＆アジア文化" },
  ],
};

const ALL_ITEMS = Object.entries(DATA).flatMap(([cat, items]) =>
  items.map((item) => ({ ...item, category: cat }))
);

const MAY_TIPS = [
  { icon: "🌤️", title: "5月の天気", text: "平均20〜25°C。晴れの日が多いが朝晩は涼しい。薄手のジャケット必携。" },
  { icon: "🎉", title: "5月のイベント", text: "ArcoLisboa（現代アートフェア）、LisbonbyDesign、各地区の祭りが開催。" },
  { icon: "💡", title: "混雑回避", text: "6月のサント・アントニオ祭前で、ハイシーズンより少し空いている狙い目の時期。" },
  { icon: "🚇", title: "移動のコツ", text: "Viva Viagem カード（メトロ・トラム・バス共通）が便利。Uber/Boltも安い。" },
];

function PriceTag({ price }) {
  return (
    <span style={{
      display: "inline-block",
      padding: "2px 10px",
      borderRadius: "20px",
      fontSize: "11px",
      fontWeight: 600,
      background: "rgba(205,133,63,0.12)",
      color: "#b8860b",
      letterSpacing: "0.5px",
    }}>{price}</span>
  );
}

function HeartButton({ isFav, onToggle }) {
  return (
    <button
      onClick={(e) => { e.stopPropagation(); onToggle(); }}
      style={{
        background: "none",
        border: "none",
        cursor: "pointer",
        fontSize: "20px",
        padding: "4px",
        lineHeight: 1,
        transition: "transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)",
        transform: isFav ? "scale(1.25)" : "scale(1)",
        flexShrink: 0,
      }}
      aria-label={isFav ? "お気に入りから削除" : "お気に入りに追加"}
    >
      {isFav ? "❤️" : "🤍"}
    </button>
  );
}

function Card({ item, index, accent, isFav, onToggleFav, categoryLabel }) {
  const [open, setOpen] = useState(false);
  return (
    <div
      onClick={() => setOpen(!open)}
      style={{
        background: "#fffbf5",
        borderRadius: "14px",
        padding: "20px 22px",
        cursor: "pointer",
        border: isFav ? "1.5px solid #e8a0a0" : "1px solid #ede4d4",
        transition: "all 0.25s ease",
        boxShadow: open ? "0 8px 32px rgba(139,90,43,0.10)" : "0 2px 8px rgba(139,90,43,0.04)",
        transform: open ? "translateY(-2px)" : "none",
        animationDelay: `${index * 60}ms`,
        animation: "fadeUp 0.5s ease both",
      }}
    >
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: "8px" }}>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ display: "flex", alignItems: "center", gap: "8px", flexWrap: "wrap", marginBottom: "6px" }}>
            <span style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: "17px", fontWeight: 700, color: "#3a2a14" }}>
              {item.name}
            </span>
            <PriceTag price={item.price} />
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "8px", flexWrap: "wrap" }}>
            <span style={{ fontSize: "12px", color: "#9a8a70", fontWeight: 500 }}>📍 {item.area}</span>
            {categoryLabel && (
              <span style={{
                fontSize: "10px", padding: "1px 8px", borderRadius: "10px",
                background: "rgba(139,90,43,0.08)", color: "#8b6d4a", fontWeight: 600,
              }}>{categoryLabel}</span>
            )}
          </div>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "2px", flexShrink: 0 }}>
          <HeartButton isFav={isFav} onToggle={onToggleFav} />
          <span style={{
            fontSize: "18px", transition: "transform 0.25s ease",
            transform: open ? "rotate(180deg)" : "rotate(0deg)", color: "#c4a265",
          }}>▾</span>
        </div>
      </div>
      {open && (
        <div style={{ marginTop: "14px", animation: "fadeUp 0.3s ease" }}>
          <p style={{ fontSize: "13.5px", lineHeight: 1.7, color: "#5a4a34", margin: 0 }}>{item.desc}</p>
          {item.must && (
            <div style={{
              marginTop: "12px", padding: "10px 14px",
              background: `linear-gradient(135deg, ${accent}10, ${accent}08)`,
              borderRadius: "10px", borderLeft: `3px solid ${accent}`,
            }}>
              <span style={{ fontSize: "12px", fontWeight: 700, color: accent }}>🍽️ マスト：</span>
              <span style={{ fontSize: "12.5px", color: "#5a4a34", marginLeft: "4px" }}>{item.must}</span>
            </div>
          )}
          {item.tip && (
            <div style={{ marginTop: "8px", fontSize: "12px", color: "#a09070", fontStyle: "italic" }}>💡 {item.tip}</div>
          )}
        </div>
      )}
    </div>
  );
}

export default function LisbonGuide() {
  const [active, setActive] = useState("seafood");
  const [favIds, setFavIds] = useState(new Set());

  const toggleFav = useCallback((id) => {
    setFavIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id); else next.add(id);
      return next;
    });
  }, []);

  useEffect(() => {
    const style = document.createElement("style");
    style.textContent = `
      @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;600;700;900&family=Noto+Sans+JP:wght@300;400;500;600;700&display=swap');
      @keyframes fadeUp { from { opacity:0; transform:translateY(16px); } to { opacity:1; transform:translateY(0); } }
      @keyframes shimmer { 0% { background-position:-200% 0; } 100% { background-position:200% 0; } }
      @keyframes float { 0%,100% { transform:translateY(0); } 50% { transform:translateY(-6px); } }
      @keyframes pulse { 0%,100% { transform:scale(1); } 50% { transform:scale(1.1); } }
      * { box-sizing:border-box; margin:0; padding:0; }
      body { background:#f8f3eb; }
      ::-webkit-scrollbar { width:6px; }
      ::-webkit-scrollbar-track { background:transparent; }
      ::-webkit-scrollbar-thumb { background:#d4c4a8; border-radius:3px; }
    `;
    document.head.appendChild(style);
    return () => document.head.removeChild(style);
  }, []);

  const accents = {
    seafood: "#c46b3a", cafe: "#8b6d4a", street: "#b8860b",
    famous: "#6b7b3a", hidden: "#7a5c8a", art: "#c44a6a", favorites: "#d94040",
  };
  const catLabelMap = {};
  CATEGORIES.forEach((c) => { catLabelMap[c.id] = c.label; });

  const isFavorites = active === "favorites";
  const items = isFavorites
    ? ALL_ITEMS.filter((item) => favIds.has(item.id))
    : (DATA[active] || []);
  const accent = accents[active];

  return (
    <div style={{ fontFamily: "'Noto Sans JP','Hiragino Sans',sans-serif", minHeight: "100vh", background: "#f8f3eb", color: "#3a2a14" }}>
      {/* Hero */}
      <div style={{ position: "relative", padding: "48px 24px 36px", background: "linear-gradient(165deg,#2a1f14 0%,#4a3520 40%,#6b4a2a 100%)", overflow: "hidden" }}>
        <div style={{ position: "absolute", inset: 0, opacity: 0.06, backgroundImage: "repeating-conic-gradient(#fff 0% 25%,transparent 0% 50%)", backgroundSize: "24px 24px" }} />
        <div style={{ position: "absolute", top: "-40px", right: "-20px", width: "180px", height: "180px", borderRadius: "50%", background: "radial-gradient(circle,rgba(196,165,100,0.2),transparent 70%)", animation: "float 6s ease-in-out infinite" }} />
        <div style={{ position: "relative", maxWidth: "680px", margin: "0 auto" }}>
          <div style={{ display: "inline-block", padding: "4px 14px", borderRadius: "20px", background: "rgba(196,165,100,0.2)", border: "1px solid rgba(196,165,100,0.3)", fontSize: "11px", fontWeight: 600, color: "#c4a564", letterSpacing: "2px", marginBottom: "16px" }}>
            MAIO 2026 · 5月の旅
          </div>
          <h1 style={{ fontFamily: "'Playfair Display',Georgia,serif", fontSize: "clamp(32px,7vw,48px)", fontWeight: 900, color: "#fff", lineHeight: 1.15, marginBottom: "10px", letterSpacing: "-0.5px" }}>
            Lisboa<br />
            <span style={{ background: "linear-gradient(90deg,#c4a564,#e8c97a,#c4a564)", backgroundSize: "200% auto", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", animation: "shimmer 4s linear infinite" }}>グルメ＆観光ガイド</span>
          </h1>
          <p style={{ fontSize: "13px", color: "rgba(255,255,255,0.5)", lineHeight: 1.7, maxWidth: "440px" }}>
            日本人旅行者のためのリスボン完全攻略。<br />
            シーフード、穴場、アート、ストリートフードまで。<br />
            <span style={{ color: "rgba(255,255,255,0.35)", fontSize: "11px" }}>Lisboa = ポルトガル語で「リスボン」。語源は「安全な港」。</span>
          </p>
        </div>
      </div>

      {/* Category Tabs */}
      <div style={{ position: "sticky", top: 0, zIndex: 100, background: "rgba(248,243,235,0.92)", backdropFilter: "blur(12px)", borderBottom: "1px solid #ede4d4" }}>
        <div style={{ maxWidth: "680px", margin: "0 auto", padding: "12px 16px", display: "flex", gap: "6px", overflowX: "auto", WebkitOverflowScrolling: "touch", scrollbarWidth: "none" }}>
          {CATEGORIES.map((cat) => {
            const isActive = active === cat.id;
            const isFavTab = cat.id === "favorites";
            return (
              <button key={cat.id} onClick={() => setActive(cat.id)} style={{
                position: "relative", padding: "8px 16px", borderRadius: "24px", border: "none", cursor: "pointer",
                fontSize: "13px", fontWeight: isActive ? 700 : 500, fontFamily: "'Noto Sans JP',sans-serif", whiteSpace: "nowrap",
                transition: "all 0.25s ease",
                background: isActive ? `linear-gradient(135deg,${accents[cat.id]},${accents[cat.id]}dd)` : "rgba(139,90,43,0.06)",
                color: isActive ? "#fff" : "#8b6d4a",
                boxShadow: isActive ? `0 4px 16px ${accents[cat.id]}30` : "none",
              }}>
                {cat.label}
                {isFavTab && favIds.size > 0 && (
                  <span style={{
                    position: "absolute", top: "-4px", right: "-4px", width: "18px", height: "18px",
                    borderRadius: "50%", background: "#d94040", color: "#fff", fontSize: "10px", fontWeight: 700,
                    display: "flex", alignItems: "center", justifyContent: "center", animation: "pulse 2s ease-in-out infinite",
                  }}>{favIds.size}</span>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Content */}
      <div style={{ maxWidth: "680px", margin: "0 auto", padding: "20px 16px 24px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "18px" }}>
          <span style={{ fontSize: "28px" }}>{CATEGORIES.find(c => c.id === active)?.emoji}</span>
          <div>
            <h2 style={{ fontFamily: "'Playfair Display',Georgia,serif", fontSize: "22px", fontWeight: 700, color: "#3a2a14" }}>
              {CATEGORIES.find(c => c.id === active)?.label.replace(/^[^\s]+\s/, "")}
            </h2>
            <span style={{ fontSize: "12px", color: "#a09070" }}>
              {isFavorites ? (items.length === 0 ? "ハートをタップしてお気に入りを追加" : `${items.length}件のお気に入り`) : `${items.length}件のおすすめ`}
            </span>
          </div>
        </div>

        {isFavorites && items.length === 0 ? (
          <div style={{ textAlign: "center", padding: "60px 24px", animation: "fadeUp 0.5s ease both" }}>
            <div style={{ fontSize: "48px", marginBottom: "16px", opacity: 0.3 }}>🤍</div>
            <p style={{ fontSize: "14px", color: "#a09070", lineHeight: 1.8 }}>
              まだお気に入りがありません。<br />
              各カードの 🤍 をタップして<br />行きたい場所を保存しましょう！
            </p>
          </div>
        ) : (
          <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
            {items.map((item, i) => (
              <Card key={item.id} item={item} index={i}
                accent={isFavorites ? (accents[item.category] || "#d94040") : accent}
                isFav={favIds.has(item.id)} onToggleFav={() => toggleFav(item.id)}
                categoryLabel={isFavorites ? catLabelMap[item.category] : null}
              />
            ))}
          </div>
        )}
      </div>

      {/* May Tips — at bottom */}
      <div style={{ maxWidth: "680px", margin: "0 auto", padding: "0 16px 20px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "14px" }}>
          <span style={{ fontSize: "22px" }}>🗓️</span>
          <h3 style={{ fontFamily: "'Playfair Display',Georgia,serif", fontSize: "18px", fontWeight: 700, color: "#3a2a14" }}>5月の旅行情報</h3>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(2,1fr)", gap: "10px" }}>
          {MAY_TIPS.map((t, i) => (
            <div key={i} style={{
              background: "#fff", borderRadius: "12px", padding: "14px 16px",
              border: "1px solid #ede4d4", animation: "fadeUp 0.5s ease both", animationDelay: `${i * 80}ms`,
            }}>
              <div style={{ fontSize: "20px", marginBottom: "6px" }}>{t.icon}</div>
              <div style={{ fontSize: "11px", fontWeight: 700, color: "#8b6d4a", marginBottom: "4px", letterSpacing: "0.5px" }}>{t.title}</div>
              <div style={{ fontSize: "12px", color: "#6b5a44", lineHeight: 1.6 }}>{t.text}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Footer */}
      <div style={{ maxWidth: "680px", margin: "0 auto", padding: "0 16px 40px" }}>
        <div style={{ padding: "24px", background: "linear-gradient(135deg,#2a1f14,#4a3520)", borderRadius: "16px", textAlign: "center", color: "rgba(255,255,255,0.7)", fontSize: "12px", lineHeight: 1.8 }}>
          <div style={{ fontSize: "18px", marginBottom: "8px" }}>🇵🇹</div>
          <div style={{ fontFamily: "'Playfair Display',serif", fontSize: "16px", color: "#c4a564", fontWeight: 600, marginBottom: "8px" }}>Boa Viagem!</div>
          リスボン 5月旅行ガイド 2026<br />
          ※ 価格・営業時間は変更される場合があります<br />
          ※ 人気店は事前予約をおすすめします
        </div>
      </div>
    </div>
  );
}
