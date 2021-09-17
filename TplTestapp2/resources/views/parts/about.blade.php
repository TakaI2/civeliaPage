
        @include("parts.common",["title" => "会社概要"])
        @include("parts.header")
        <main>
            <h1>会社概要ページ</h1>
            <p>現在の時間は{{$current_time}}です。</p>
        </main>
        @include("parts.footer")
    </body>
</html>