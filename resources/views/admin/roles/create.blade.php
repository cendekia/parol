@extends('admin.layouts.default')

@section('page-level-styles')
@endsection

@section('content')
    @if (count($errors) > 0)
        <div class="uk-alert-danger" uk-alert>
            <a class="uk-alert-close" uk-close></a>
            @foreach ($errors->all() as $error)
                <p>{{ $error }}</p>
            @endforeach
        </div>
    @endif
    <h3>
        @if(isset($pageTitle)) {!! $pageTitle !!}@endif
    </h3>

    <form class="uk-form uk-form-stacked" action="{!! action('RolesController@store') !!}" method="POST">
        {!! csrf_field() !!}
        <div class="uk-margin">
            <label class="uk-form-label" for="">Show Name</label>
            <div class="uk-form-controls">
                <input class="uk-input" type="text" name="display_name"
                @if(old('display_name') != '')
                    value="{!! old('display_name') !!}"
                @endif autofocus>
            </div>
        </div>
        <div class="uk-margin">
            <label class="uk-form-label" for="">Name</label>
            <div class="uk-form-controls">
                <input class="uk-input" type="text" name="name"
                @if(old('name') != '')
                    value="{!! old('name') !!}"
                @endif >
            </div>
        </div>
        <div class="uk-margin">
            <label class="uk-form-label" for="">Permissions</label>
            <div class="uk-form-controls">
                @foreach($permissions as $permission)
                    <input type="checkbox" class="uk-checkbox" name="permissions[]"
                           {{ isset(old('permissions')[$loop->index]) ? 'checked' : '' }}
                           value="{{ $permission->name }}" /> {{ $permission->display_name }}
                @endforeach
            </div>
        </div>
        <div class="uk-flex uk-flex-middle uk-flex-between">
            <a href="{!! action('RolesController@index') !!}" class="uk-button uk-button-default">Back</a>
            <button type="submit" class="uk-button uk-button-primary">Save</button>
        </div>
    </form>
@endsection

@section('page-level-scripts')
@endsection
