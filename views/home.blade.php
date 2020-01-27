@extends('default')

@section('content')
    <div class="pure-g">
        <div class="pure-u-1-4">
        </div>
        <div class="pure-u-3-4">
            <h1>{{ $site['title'] }}</h1>
        </div>
    </div>

    @foreach($posts as $post)
    <article class="pure-g">
        <div class="pure-u-1-4">
            <a href="{{ $site['link'] }}">
                <time>{{ $post['date']->format('Y M j H:i') }}</time>
            </a>
        </div>
        <div class="pure-u-3-4">
            <h3>
                <a href="{{ $post['path'] }}">{{ $post['title'] }}</a>
            </h3>

            {!! $post['excerpt'] ?? $post['contents'] !!}

            @isset($post['excerpt'])<a href="{{ $post['path'] }}">more</a>@endisset

            @isset($post['tags'])
            <div class="tags">
                <ul>
                @foreach($post['tags'] as $tag)
                <li><a href="/tags/{{ $tag }}/">#{{ $tag }}</a></li>
                @endforeach
                </ul>
            </div>
            @endisset
        </div>
    </article>
    @endforeach
@endsection
