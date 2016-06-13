

editAreaLoader.load_syntax["html"] = {
	'COMMENT_SINGLE' : {}
	,'COMMENT_MULTI' : {'<!--' : '-->'}
	,'QUOTEMARKS' : {1: '"'}
	,'KEYWORD_CASE_SENSITIVE' : false
	,'KEYWORDS' : {
	}
	,'OPERATORS' :[
	]
	,'DELIMITERS' :['<', '>'
	]
	,'REGEXPS' : {
		'doctype' : {
			'search' : '()(<!DOCTYPE[^>]*>)()'
			,'class' : 'doctype'
			,'modifiers' : ''
			,'execute' : 'before' // before or after
		}
		,'tags' : {
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
		}
		,'OPERATORS' : 'color: #E775F0;'
		,'DELIMITERS' : 'color: #0000FF;'
		,'REGEXPS' : {
			'attributes': 'color: #FF0000;'
			,'tags': 'color: #A31515;'
			,'doctype': 'color: #A31515;'
		}	
	}		
};
