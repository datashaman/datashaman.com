<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>
        @isset($title){{ $title }} - @endisset{{ $site['title'] }}
    </title>
    <link rel="stylesheet" href="/styles/main.css">
</head>
<body class="view--{{ $view }}">
    <main>
        <div class="pure-g">
            <div class="pure-u-1-4">
            </div>
            <div class="pure-u-3-4">
                <h1>{{ $site['title'] }}</h1>
            </div>
        </div>

        @yield('content')
    </main>
</body>
</html>
