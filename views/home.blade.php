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
            <time>{{ $post['date']->format('M D, H:i') }}</time>
        </div>
        <div class="pure-u-3-4">
            <h2>
                <a href="{{ $post['path'] }}">{{ $post['title'] }}</a>
            </h2>

            {!! $post['excerpt'] ?? $post['contents'] !!}
            @if(@$post['excerpt'])<a href="{{ $post['path'] }}">more</a>@endif
        </div>
    </article>
    @endforeach
@endsection
