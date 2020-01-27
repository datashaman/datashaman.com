@extends('default')

@section('content')
    <article class="pure-g">
        <div class="pure-u-1-4">
            <a href="{{ $site['link'] }}">
                <time>{{ $date->format('Y M j H:i') }}</time>
            </a>
        </div>
        <div class="pure-u-3-4">
            <h3>
                <a href="{{ $path }}">{{ $title }}</a>
            </h3>

            {!! $contents !!}
        </div>
    </article>
@endsection
