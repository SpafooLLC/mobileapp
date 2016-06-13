editAreaLoader.load_syntax["cs"] = {
	'COMMENT_SINGLE' : {1 : '//'}
	,'COMMENT_MULTI' : {'/*' : '*/'}
	,'QUOTEMARKS' : {1: "'", 2: '"'}
	,'KEYWORD_CASE_SENSITIVE' : true
	,'KEYWORDS' : {
		'keywords' : [
			'abstract', 'as', 'base', 'bool', 'break', 'byte', 'case', 'catch', 'char', 'checked', 'class', 
			'const', 'continue', 'decimal', 'default', 'delegate', 'do', 'double', 'else', 'enum', 'event', 
			'explicit', 'extern', 'false', 'finally', 'fixed', 'float', 'for', 'foreach', 'get', 'goto', 'if', 
			'implicit', 'in', 'int', 'interface', 'internal', 'is', 'lock', 'long', 'namespace', 'new', 
			'null', 'object', 'operator', 'out', 'override', 'partial', 'params', 'private', 'protected', 'public', 
			'readonly', 'ref', 'return', 'sbyte', 'sealed', 'set', 'short', 'sizeof', 'stackalloc', 'static', 
			'string', 'struct', 'switch', 'this', 'throw', 'true', 'try', 'typeof', 'uint', 'ulong', 'unchecked', 
			'unsafe', 'ushort', 'using', 'value', 'virtual', 'volatile', 'void', 'where', 'while', 'yield'
		]
    ,'classes' : [
			'AccessViolationException', 'ActivationContext', 'Activator', 'AppDomain', 'AppDomainManager', 
			'AppDomainSetup', 'AppDomainUnloadedException', 'ApplicationException', 'ApplicationId', 
			'ApplicationIdentity', 'ArgumentException', 'ArgumentNullException', 'ArgumentOutOfRangeException', 
			'ArithmeticException', 'Array', 'ArrayTypeMismatchException', 'AssemblyLoadEventArgs', 'Attribute', 
			'AttributeUsageAttribute', 'BadImageFormatException', 'BitConverter', 'Buffer', 
			'CannotUnloadAppDomainException', 'CharEnumerator', 'CLSCompliantAttribute', 'Console', 
			'ConsoleCancelEventArgs', 'ContextBoundObject', 'ContextMarshalException', 'ContextStaticAttribute', 
			'Convert', 'DataMisalignedException', 'DBNull', 'Delegate', 'DivideByZeroException', 
			'DllNotFoundException', 'DuplicateWaitObjectException', 'EntryPointNotFoundException', 
			'Enum', 'Environment', 'EventArgs', 'Exception', 'ExecutionEngineException', 'FieldAccessException', 
			'FileStyleUriParser', 'FlagsAttribute', 'FormatException', 'FtpStyleUriParser', 'GC', 
			'GenericUriParser', 'GopherStyleUriParser', 'HttpStyleUriParser', 'IndexOutOfRangeException', 
			'InsufficientMemoryException', 'InvalidCastException', 'InvalidOperationException', 
			'InvalidProgramException', 'InvalidTimeZoneException', 'LdapStyleUriParser', 
			'LoaderOptimizationAttribute', 'LocalDataStoreSlot', 'MarshalByRefObject', 'Math', 
			'MemberAccessException', 'MethodAccessException', 'MissingFieldException', 'MissingMemberException', 
			'MissingMethodException', 'MTAThreadAttribute', 'MulticastDelegate', 'MulticastNotSupportedException', 
			'NetPipeStyleUriParser', 'NetTcpStyleUriParser', 'NewsStyleUriParser', 'NonSerializedAttribute', 
			'NotFiniteNumberException', 'NotImplementedException', 'NotSupportedException', 'Nullable', 
			'NullReferenceException', 'Object', 'ObjectDisposedException', 'ObsoleteAttribute', 'OperatingSystem', 
			'OperationCanceledException', 'OutOfMemoryException', 'OverflowException', 'ParamArrayAttribute', 
			'PlatformNotSupportedException', 'Random', 'RankException', 'ResolveEventArgs', 'SerializableAttribute', 
			'StackOverflowException', 'STAThreadAttribute', 'String', 'StringComparer', 'SystemException', 
			'ThreadStaticAttribute', 'TimeoutException', 'TimeZone', 'TimeZoneInfo', 'TimeZoneNotFoundException', 
			'Type', 'TypeInitializationException', 'TypeLoadException', 'TypeUnloadedException', 
			'UnauthorizedAccessException', 'UnhandledExceptionEventArgs', 'Uri', 'UriBuilder', 'UriFormatException', 
			'UriParser', 'UriTemplate', 'UriTemplateEquivalenceComparer', 'UriTemplateMatch', 
			'UriTemplateMatchException', 'UriTemplateTable', 'UriTypeConverter', 'ValueType', 'Version', 'WeakReference'
		]
	}
	,'OPERATORS' :[
		'*', '/', '%', '&', '|', '^', '!', '~', '&&', '||', '<<', '>>', 
		'==', '!=', '<', '>', '<=', '>=', '=', '++', '--', '+=', '-=', '*=', '/=', '%=', '&=', 
		'|=', '^=', '<<=', '>>=', '?', ':', '+', '-'
	]
	,'DELIMITERS' :[
		'(', ')', '[', ']', '{', '}'
	]
	,'STYLES' : {
		'COMMENTS': 'color: #008000;'
		,'QUOTESMARKS': 'color: #A31515;'
		,'KEYWORDS' : {
			'keywords' : 'color: #0000FF;'
			,'classes' : 'color: #2B91AF;'
		}
		,'OPERATORS' : 'color: #000000;'
		,'DELIMITERS' : 'color: #000000;'
	}
		
};
