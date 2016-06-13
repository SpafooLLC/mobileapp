

editAreaLoader.load_syntax["asp"] = {
	'COMMENT_SINGLE' : {}
	,'COMMENT_MULTI' : {'<!--' : '-->'}
	,'QUOTEMARKS' : {1: "'", 2: '"'}
	,'KEYWORD_CASE_SENSITIVE' : false
	,'KEYWORDS' : {
	    'directives' : ['Assembly', 'Control', 'Implements', 'Input', 'OutpuCache', 
	        'Page', 'Reference', 'Register']
	}
	,'OPERATORS' :[
	]
	,'DELIMITERS' :['<', '>'
	]
	,'REGEXPS' : {
		'tags' : {
			'search' : '(<)(/?[a-z][^ \r\n\t>]*)([^>]*>)'
			,'class' : 'tags'
			,'modifiers' : 'gi'
			,'execute' : 'before' // before or after
		}
		,'attributes' : {
			'search' : '( |\n|\r|\t)([^ \r\n\t=]+)(=)'
			,'class' : 'attributes'
			,'modifiers' : 'g'
			,'execute' : 'before' // before or after
		}
	}
	,'STYLES' : {
		'COMMENTS': 'color: #008000;'
		,'QUOTESMARKS': 'color: #0000FF;'
		,'KEYWORDS' : {
		    'directives' : 'color: #A31515;'
		}
		,'OPERATORS' : 'color: #E775F0;'
		,'DELIMITERS' : 'color: #0000FF;'
		,'REGEXPS' : {
			'attributes': 'color: #FF0000;'
			,'tags': 'color: #A31515;'
			,'doctype': 'color: #8DCFB5;'
		}	
	}		
};
